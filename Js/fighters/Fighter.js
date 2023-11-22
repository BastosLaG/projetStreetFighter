import { FighterState } from '../constants/dfight.js';
import { STAGE_FLOOR } from '../constants/stage.js';
import { FighterDirection } from '../constants/dfight.js';

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;

        this.frames = new Map();
        this.animationFrame = 0;
        this.animationtimer = 0;
        this.animations = {};
        
        this.image = new Image();
        
        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [ 
                    undefined, 
                    FighterState.IDLE, FighterState.FORWARDWALK, FighterState.BACKWARDWALK, FighterState.JUMP, 
                ],
            },
            [FighterState.FORWARDWALK]: {   
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [
                    FighterState.IDLE,FighterState.FORWARDWALK, 
                ],
            },
            [FighterState.BACKWARDWALK]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [ 
                    undefined, 
                    FighterState.IDLE, FighterState.BACKWARDWALK, 
                ],
            },  
            [FighterState.JUMP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [ FighterState.IDLE ],
            },
            [FighterState.GUARD]: {
                init: this.handleGuardInit.bind(this),
                update: this.handleGuardInitialState.bind(this),
                validFrom: [ FighterState.IDLE ],
            },      
        }
        this.changeState(FighterState.IDLE);
    }

    changeState(newstate){
        if(newstate === this.currentState
             || !this.states[newstate].validFrom.includes(this.currentState)) return;

        this.currentState = newstate;
        this.animationFrame = 0;
        this.states[this.currentState].init();
    }
    
    // Idle
    handleIdleInit(){
        this.velocity.x = 0;
        this.velocity.y = 0;
        
    }
    handleIdleState() {}
    
    // Jump
    handleJumpInit(){
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }
    handleJumpState(time) {
        this.velocity.y += this.gravity * time.delta;
        
        if (this.position.y  > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.IDLE);
        }
    }
    
    // Move
    handleMoveInit(){
        //  "nullish coalescing operator"
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }
    handleMoveState() {}
    
    // Guard
    handleGuardInit(){
        this.velocity.x = 0;
    }
    handleGuardInitialState() {}
    
    
    upadteCtx(ctx){
        let WIDTH = 32;
        
        if (this.position.x > ctx.canvas.width - WIDTH ) {
            this.position.x = ctx.canvas.width - WIDTH;
        }
        
        if (this.position.x < WIDTH) {
            this.position.x = WIDTH;
        }
    }
    
    gen_map(text, listePosition) {
        for (let i = 1; i-1 < listePosition.length; i++){
            this.frames.set(text+i, [listePosition[i-1], [listePosition[i-1][2]/2, listePosition[i-1][3]]]);
        }
        return this.frames;
    }
    
    gen_AnimationObject(animationName, baseName, numFrames, timeFrames) {
        this.animations[animationName] = [];
        for (let i = 1; i <= numFrames; i++) {
            this.animations[animationName].push([`${baseName}-${i}`, timeFrames]);
        }
        console.log(this.animations);
        return this.animations;
    }
    
    draw_debug(ctx){
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        ctx.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        ctx.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        ctx.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
        ctx.stroke();
    }

    updateAnimation(time){
        let animation = this.animations[this.currentState];
        let [, frameDelay] = animation[this.animationFrame];
        if (time.passed > this.animationtimer + frameDelay){
            this.animationtimer = time.passed;
            
            if (frameDelay > 0){
                this.animationFrame++;
            }
            if (this.animationFrame >= animation.length) {
                this.animationFrame = 0;
            } 
        }
    }
    
    update(time, ctx) {    

        this.position.x += (this.velocity.x * this.direction) * time.delta;
        this.position.y += this.velocity.y * time.delta;

        this.states[this.currentState].update(time, ctx);
        this.updateAnimation(time);
        this.upadteCtx(ctx);
        
    }
    
    draw(ctx) {
        let [frameKey] = this.animations[this.currentState][this.animationFrame];
        let [
            [x, y, width, height],
            [originX, originY],
        ] = this.frames.get(frameKey);
    
        ctx.save(); // Sauvegarde l'état actuel du contexte
        ctx.translate(Math.floor(this.position.x), Math.floor(this.position.y));
        ctx.scale(this.direction, 1);
        ctx.drawImage(
            this.image, 
            x, y, 
            width, height, 
            -originX, -originY, 
            width, height
        );
        ctx.restore(); // Restaure l'état précédent du contexte
    
        this.draw_debug(ctx);
    }
    
}