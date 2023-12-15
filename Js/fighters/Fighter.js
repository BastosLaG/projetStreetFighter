import { FighterDirection, FighterState } from '../constants/dfight.js';
import { STAGE_FLOOR } from '../constants/stage.js';
import * as control from './InputHandler.js';
import { rectsOverlap } from './collision.js';


export class Fighter {
    constructor(name, x, y, direction, palyerId) {
        this.name = name;
        this.playerId = palyerId;
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
        
        this.opponent; 

        this.pushBox = { x: 0, y: 0, width: 0, height: 0 };

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
                update: this.handleWalkForwadeState.bind(this),
                validFrom: [
                    FighterState.IDLE,FighterState.FORWARDWALK, 
                ],
            },
            [FighterState.BACKWARDWALK]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
                validFrom: [ 
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

    handleIdleState() {
        // Gestion du saut avec direction
        if(control.isUp(this.playerId, this.direction)) {
            if(control.isForward(this.playerId, this.direction)) {
                // Saut en avant
                this.changeState(FighterState.JUMPFORWARD);
            } else if(control.isBackward(this.playerId, this.direction)) {
                // Saut en arrière
                this.changeState(FighterState.JUMPBACKWARD);
            } else {
                // Saut vertical
                this.changeState(FighterState.JUMP);
            }
        }
        // Gestion de la marche en avant
        else if(control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.FORWARDWALK);
        }
        // Gestion de la marche en arrière
        else if(control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.BACKWARDWALK);
        }
    }

    
    
    hasCollideWithOpponent = () => rectsOverlap(
        this.position.x + this.pushBox.x, this.position.y + this.pushBox.y,
        this.pushBox.width, this.pushBox.height,
        this.opponent.position.x + this.opponent.pushBox.x, 
        this.opponent.position.y + this.opponent.pushBox.y,
        this.opponent.pushBox.width, this.opponent.pushBox.height,
    );
    
    getDirection() {
        // Vérifie si le personnage est à gauche de l'opposant
        if (
            this.position.x + this.pushBox.x + this.pushBox.width 
            <= this.opponent.position.x  + this.opponent.pushBox.x
        ) {
            return FighterDirection.RIGHT;
        }
        // Vérifie si le personnage est à droite de l'opposant
        else if (
            this.position.x + this.pushBox.x
            >= this.opponent.position.x + this.opponent.pushBox.x + this.opponent.pushBox.width
        ) {
            return FighterDirection.LEFT;
        }
    
        return this.direction;
    }
    

    getPushBox(frameKey){
        let [, [x, y, width, height] = [0, 0, 0, 0]] = this.frames.get(frameKey);

        return {x, y, width, height};
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
    // Jump
    handleJumpInit(){
        this.velocity.y = 0;
    
        // Déterminer la direction du saut en fonction des entrées du joueur
        if (control.isForward(this.playerId, this.direction)) {
            this.velocity.x = this.initialVelocity.jumpForward;
        } else if (control.isBackward(this.playerId, this.direction)) {
            this.velocity.x = -this.initialVelocity.jumpBackward;
        } else {
            this.velocity.x = 0;
        }
    
        this.handleMoveInit();
    }
    
    // Move
    handleMoveInit(){
        //  "nullish coalescing operator"
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }
    
    // Guard
    handleGuardInit(){
        this.velocity.x = 0;
    }

    // Idle
    handleJumpState(time) {
        this.velocity.y += this.gravity * time.delta;
        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.IDLE);
        }
    
        // Maintenir le mouvement horizontal pendant le saut
        if (control.isForward(this.playerId, this.direction)) {
            this.velocity.x = this.initialVelocity.jumpForward;
        } else if (control.isBackward(this.playerId, this.direction)) {
            this.velocity.x = -this.initialVelocity.jumpBackward;
        }
    }
    

    handleWalkForwadeState() {
        if(!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
    }

    handleWalkBackwardState() {
        if(!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
    }
    // Jump
    handleJumpState(time) {
        this.velocity.y += this.gravity * time.delta;   
        if (this.position.y  > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            if(!control.isUp(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        }
    }

    // Move
    handleMoveState() {}
    // Guard
    handleGuardInitialState() {
        if(!control.isDown(this.playerId, this.direction)) this.changeState(FighterState.IDLE);

    }
    
    
    gen_map(text, listePosition, pushBox = null) {
        for (let i = 1; i-1 < listePosition.length; i++){
            let frameData = [listePosition[i-1], [listePosition[i-1][2]/2, listePosition[i-1][3]]];
            if (pushBox) {
                frameData.push(pushBox); 
            }
            this.frames.set(text + i, frameData);
        }
        return this.frames;
    }
    
    gen_AnimationObject(animationName, baseName, numFrames, timeFrames) {
        this.animations[animationName] = [];
        for (let i = 1; i <= numFrames; i++) {
            this.animations[animationName].push([`${baseName}-${i}`, timeFrames]);
        }
        return this.animations;
    }
    
    updateAnimation(time) {
        let animation = this.animations[this.currentState];
        let [frameKey, frameDelay] = animation[this.animationFrame];
        if (time.passed > this.animationtimer + frameDelay) {
            this.animationtimer = time.passed;
    
            if (frameDelay > 0) {
                this.animationFrame++;
                let frameData = this.frames.get(frameKey);
                if (frameData && frameData.length > 2) { // Vérifier si les données de pushbox existent
                    // Mettre à jour la pushbox avec les données correctes
                    this.pushBox = {
                        x: frameData[2][0],
                        y: frameData[2][1],
                        width: frameData[2][2],
                        height: frameData[2][3]
                    };
                }
            }
            if (this.animationFrame >= animation.length) {
                this.animationFrame = 0;
            }
        }
    }
    
    draw_debug(ctx) {
        if (this.pushBox) {
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.strokeRect(
                this.position.x + this.pushBox.x, // x
                this.position.y + this.pushBox.y, // y
                this.pushBox.width, // width
                this.pushBox.height // height
            );
        }
    
        // Dessiner le point d'origine pour le débogage
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(Math.floor(this.position.x) - 4, Math.floor(this.position.y) - 0.5);
        ctx.lineTo(Math.floor(this.position.x) + 5, Math.floor(this.position.y) - 0.5);
        ctx.moveTo(Math.floor(this.position.x) + 0.5, Math.floor(this.position.y) - 5);
        ctx.lineTo(Math.floor(this.position.x) + 0.5, Math.floor(this.position.y) + 4);
        ctx.stroke();
    }
    updateCtx(ctx) {
        // Gérer la limite droite du canvas
        this.position.x = Math.min(this.position.x, ctx.canvas.width - this.pushBox.width);
    
        // Gérer la limite gauche du canvas
        this.position.x = Math.max(this.position.x, 0);
    
        // Gestion de la collision avec l'opposant
        if (this.hasCollideWithOpponent()) {
            let isOpponentToLeft = this.position.x < this.opponent.position.x;
            let isOpponentToRight = this.position.x > this.opponent.position.x;
            if (isOpponentToLeft) {
                this.position.x = this.opponent.position.x - this.pushBox.width - 1; // Ajustement minimal pour éviter le chevauchement
            }
            else {
                this.position.x = this.opponent.position.x + this.opponent.pushBox.width + 1; // Ajustement minimal pour éviter le chevauchement
            }

            if (isOpponentToRight) {
                this.position.x = this.opponent.position.x + this.pushBox.width - 1; // Ajustement minimal pour éviter le chevauchement
            }
            else {
                this.position.x = this.opponent.position.x - this.opponent.pushBox.width + 1; // Ajustement minimal pour éviter le chevauchement
            }
        }
    }
    
    
    update(time, ctx) {   
        // Mise à jour de la position en fonction de la vélocité et de la direction
        this.position.x += (this.velocity.x * this.direction) * time.delta;
        this.position.y += this.velocity.y * time.delta;
    
        // Mise à jour de la direction basée sur la position de l'opposant
        this.direction = this.getDirection();
    
        // Mise à jour de l'état actuel
        switch (this.currentState) {
            case FighterState.ENTRY:
                this.handleEntryState();
                break;
            // Ajouter d'autres cas pour les différents états si nécessaire
            default:
                // Si l'état actuel ne nécessite pas de traitement spécial, utilisez le traitement standard
                if (this.states[this.currentState] && this.states[this.currentState].update) {
                    this.states[this.currentState].update(time, ctx);
                }
                break;
        }
    
        // Mise à jour de l'animation en fonction de l'état actuel
        this.updateAnimation(time);
    
        // Mise à jour du contexte (gestion des collisions, limites du canvas, etc.)
        this.updateCtx(ctx);
    }
    
    
    draw(ctx) {
        let [frameKey] = this.animations[this.currentState][this.animationFrame];
        let frameData = this.frames.get(frameKey);
    
        if (!frameData) {
            console.error(`Frame data not found for key: ${frameKey}`);
            return; // Arrêter la méthode si aucune donnée de frame n'est trouvée
        }
    
        let [
            [x, y, width, height],
            [originX, originY],
            // Si vous avez besoin du troisième tableau, déstructurez-le ici
        ] = frameData;
        
        ctx.save(); // Sauvegarde l'état actuel du contexte
        ctx.translate(Math.floor(this.position.x), Math.floor(this.position.y));
        ctx.scale(this.direction, 1);
        ctx.drawImage(
            this.image, 
            x, y, 
            width, height, 
            -originX, 
            -originY, 
            width, height
        );
        ctx.restore(); // Restaure l'état précédent du contexte
        
        this.draw_debug(ctx);
    }
}