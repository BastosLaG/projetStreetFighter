import { registerKeyboardEvents } from './fighters/InputHandler.js';
import { BattleScene } from './scenes/BattleScene.js';

export class StreetFighterGame { 
    ctx = this.getContext();
    frames_time = {
        passed: 0,
        delta: 0,
    };
    constructor() {
        this.scene = new BattleScene();
    }
    
    getContext(){
        let canvasInfo = document.querySelector('canvas');
        let ctx = canvasInfo.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        return ctx;
    }

    // Fonction de la boucle de jeu, appelée à chaque frame.
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));
        
        this.frames_time = {
            delta: (time - this.frames_time.passed) / 1000,
            passed: time,
        }
        this.scene.update(this.frames_time, this.ctx);
        this.scene.draw(this.ctx); 
    }

    start() {
        registerKeyboardEvents ();
        window.requestAnimationFrame(this.frame.bind(this));
    }

}