import { Bastien } from './fighters/Bastien.js';
import { Mehdi } from './fighters/Mehdi.js';
import { Stage } from './gestions/Stage.js';
import { FpsCounter } from './gestions/FpsCounter.js';
import { FighterDirection } from './constants/dfight.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { registerKeyboardEvents } from './fighters/InputHandler.js';
import { StatusBar } from './overlays/StatusBar.js';
import { Camera } from './camera.js';


export class StreetFighterGame { 
    constructor() {
        this.ctx = this.getContext();
        this.fighters = [
            new Bastien(552, STAGE_FLOOR, FighterDirection.RIGHT, 1),
            new Mehdi(728, STAGE_FLOOR, FighterDirection.LEFT, 0),
        ];

        this.fighters[1].opponent = this.fighters[0];
        this.fighters[0].opponent = this.fighters[1];

        this.camera = new Camera(440, 16, this.fighters);

        this.objets = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
        ];
        this.frames_time = {
            passed: 0,
            delta: 0,
        };
    }
    
    getContext(){
        let canvasInfo = document.querySelector('canvas');
        let ctx = canvasInfo.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        return ctx;
    }

    update(){
        this.camera.update(this.frames_time, this.ctx);
        for(let objet of this.objets){
            objet.update(this.frames_time, this.ctx, this.camera);
        }
    }
    draw(){
        for (let objet of this.objets) {
            objet.draw(this.ctx, this.camera);
        }
    }
    // Fonction de la boucle de jeu, appelée à chaque frame.
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));
        
        this.frames_time = {
            delta: (time - this.frames_time.passed) / 1000,
            passed: time,
        }
        this.update();
        this.draw(); 
    }

    start() {
        registerKeyboardEvents ();
        window.requestAnimationFrame(this.frame.bind(this));
    }

}