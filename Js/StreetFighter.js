import { Bastien } from './fighters/Bastien.js';
import { Mehdi } from './fighters/Mehdi.js';
// import { Ludovic } from './fighters/Ludovic.js';
// import { Tomas } from './fighters/Tomas.js';
import { Stage } from './gestions/Stage.js';
import { FpsCounter } from './gestions/FpsCounter.js';
import { FighterDirection, FighterState } from './constants/dfight.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { registerKeyboardEvents } from './fighters/InputHandler.js';


export class StreetFighterGame { 
    constructor() {
        this.ctx = this.getContext();
        this.fighters = [
            new Mehdi(300, STAGE_FLOOR, FighterDirection.LEFT, 0),
            new Bastien(100, STAGE_FLOOR, FighterDirection.RIGHT, 1),
        ];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.objets = [
            new Stage("./assets/Background.jpg"),
            ...this.fighters,
            new FpsCounter(),
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
        for(let objet of this.objets){
            objet.update(this.frames_time, this.ctx);
        }
    }
    draw(){
        for (let objet of this.objets) {
            objet.draw(this.ctx);
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