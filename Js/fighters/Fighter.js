import { FighterDirection, FighterState, FrameDelay, FighterAttackType, FighterAttackStrength, FighterAttackBaseData  } from '../constants/dfight.js';
import { STAGE_FLOOR } from '../constants/stage.js';
import * as control from './InputHandler.js';
import { getActualBoxDimensions, rectsOverlap, boxOverlap } from './collision.js';
import { Control } from '../constants/control.js';
import { gameState } from '../gestions/gameState.js';

const LATERAL_AIR_VELOCITY = 76;
export class Fighter {
    constructor(x, y, direction, palyerId) {
        this.playerId = palyerId;
        
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;
        this.currentState = null;
        this.damageDealt = false; 
        this.lastHitTime = 0;
        this.hitCooldown = 400; 

        this.frames = new Map();
        this.animationFrame = 0;
        this.animationtimer = 0;
        this.animations = {};
        
        this.image = new Image();
        
        this.opponent; 

        this.boxes = { 
            push: {x: 0, y: 0, width: 0, height: 0 },
            hurt: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            hit: {x: 0, y: 0, width: 0, height: 0 },
        };

        this.states = {     
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [ 
                    undefined, 
                    FighterState.IDLE, FighterState.ENTRY, FighterState.FORWARDWALK, FighterState.BACKWARDWALK, FighterState.JUMP, FighterState.GUARD, FighterState.PUNCH, FighterState.UPKICK, FighterState.HIT],
 
            },
            [FighterState.FORWARDWALK]: {   
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwadeState.bind(this),
                validFrom: [ FighterState.IDLE,FighterState.FORWARDWALK],
            },
            [FighterState.BACKWARDWALK]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
                validFrom: [ FighterState.IDLE, FighterState.BACKWARDWALK ],
            },  
            [FighterState.JUMP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [ FighterState.IDLE, FighterState.FORWARDWALK, FighterState.BACKWARDWALK],

            },
            [FighterState.GUARD]: {
                init: this.handleGuardInit.bind(this),
                update: this.handleGuardInitialState.bind(this),
                validFrom: [ FighterState.IDLE, FighterState.FORWARDWALK, FighterState.BACKWARDWALK],

            },
            [FighterState.PUNCH]: {
                attackType : FighterAttackType.PUNCH,
                attackStrength: FighterAttackStrength.LIGHT,
                init: this.handlePunchInit.bind(this),
                update: this.handlePunchState.bind(this),
                validFrom: [ FighterState.IDLE, FighterState.FORWARDWALK, FighterState.BACKWARDWALK, FighterState.HIT],
            },
            [FighterState.UPKICK]: {
                attackType : FighterAttackType.KICK,
                attackStrength: FighterAttackStrength.MEDIUM,
                init: this.handleUpKickInit.bind(this),
                update: this.handleUpKickState.bind(this),
                validFrom: [ FighterState.IDLE, FighterState.FORWARDWALK, FighterState.BACKWARDWALK, FighterState.HIT],
            },
            [FighterState.ENTRY]: {
                init: this.handleEntryInit.bind(this),
                update: this.handleEntryState.bind(this),
                validFrom: [ FighterState.IDLE ],
            },


        };
        this.changeState(FighterState.ENTRY);

    }


    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;


    handleIdleState() {
        let isJumping = control.isUp(this.playerId);
        let isMovingForward = control.isForward(this.playerId, this.direction);
        let isMovingBackward = control.isBackward(this.playerId, this.direction);
    
        if (isJumping && isMovingForward) {
            // Combine jumping and moving forward
            this.changeState(FighterState.JUMPFORWARD);
        } else if (isJumping && isMovingBackward) {
            // Combine jumping and moving backward
            this.changeState(FighterState.JUMPBACKWARD);
        } else if (isJumping) {
            // Just jumping
            this.changeState(FighterState.JUMP);
        } else if (isMovingForward) {
            // Just moving forward
            this.changeState(FighterState.FORWARDWALK);
        } else if (isMovingBackward) {
            // Just moving backward
            this.changeState(FighterState.BACKWARDWALK);
        } else if (control.isDown(this.playerId)) {
            // Just guard
            this.changeState(FighterState.GUARD);
        } else if (control.isPunch(this.playerId, Control.PUNCH)) {
            // Just punch
            this.changeState(FighterState.PUNCH);
        } else if (control.isUpKick(this.playerId, Control.UPKICK)) {
            // Just upkick
            this.changeState(FighterState.UPKICK);
        }


    }
    
    
    
    hasCollideWithOpponent = () => rectsOverlap(
        this.position.x + this.boxes.push.x, this.position.y + this.boxes.push.y,
        this.boxes.push.width, this.boxes.push.height,
        this.opponent.position.x + this.opponent.boxes.push.x, 
        this.opponent.position.y + this.opponent.boxes.push.y,
        this.opponent.boxes.push.width, this.opponent.boxes.push.height,
    );
    
    getDirection() {
        // Vérifie si le personnage est à gauche de l'opposant
        if (
            this.position.x + this.boxes.push.x + this.boxes.push.width 
            <= this.opponent.position.x  + this.opponent.boxes.push.x
        ) {
            return FighterDirection.RIGHT;
        }
        // Vérifie si le personnage est à droite de l'opposant
        else if (
            this.position.x + this.boxes.push.x
            >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width
        ) {
            return FighterDirection.LEFT;
        }
    
        return this.direction;
    }
    

    getBoxes(frameKey){
        let [, 
            [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] =  [],
            [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
        ] = this.frames.get(frameKey);
        
        
        return {
            push: { x: pushX, y: pushY, width: pushWidth, height: pushHeight },
            hurt: [head, body, feet],
            hit: { x: hitX, y: hitY, width: hitWidth, height: hitHeight },
        };
        
    }


    changeState(newState) {
        // Vérifier si newState est défini et existe dans this.states
        if (newState === undefined || !this.states[newState]) {
            console.warn(`Transition d'état invalide de ${this.currentState} à ${newState}`);
            this.damageDealt = false;
            return;
        }
    
        this.currentState = newState;
        this.animationFrame = 0;
        this.states[this.currentState].init();
    }
    
    

    handleEntryInit() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.position.y = STAGE_FLOOR;
    }
    

    
    // Idle
    handleIdleInit(){
        this.velocity.x = 0;
        this.velocity.y = 0; 
    }
    // Jump
    handleJumpInit(){
        this.velocity.y = this.initialVelocity.jump;

    }
    
    // Move
    handleMoveInit(){
        //  "nullish coalescing operator"
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }
    
    // Guard

    handleGuardInit() { 
        this.velocity.x = 0;

    }


    handlePunchInit() {
        this.handleIdleInit();
        this.damageDealt = false; 
        this.boxes.hit = { x: 0, y: 0, width: 0, height: 0 }; // Désactiver la hitbox
    }
    

    handleUpKickInit() {
        this.handleIdleInit();
        this.damageDealt = false; 
        this.boxes.hit = { x: 0, y: 0, width: 0, height: 0 }; // Désactiver la hitbox

    }

    handleHitInit() {
        this.handleIdleInit();
        this.boxes.hit = { x: 0, y: 0, width: 0, height: 0 }; // Désactiver la hitbox
    }


    handleWalkForwadeState() {
        if(!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if(control.isDown(this.playerId)) this.changeState(FighterState.GUARD);
        if(control.isUp(this.playerId)) this.changeState(FighterState.JUMP);

        if (control.isPunch(this.playerId, Control.PUNCH)) {
            // Just punch
            this.changeState(FighterState.PUNCH);
        } else if (control.isUpKick(this.playerId, Control.UPKICK)) {
            // Just upkick
            this.changeState(FighterState.UPKICK);
        }
    }   


    handleWalkBackwardState() {
        if(!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if(control.isDown(this.playerId)) this.changeState(FighterState.GUARD);
        if(control.isUp(this.playerId)) this.changeState(FighterState.JUMP);


        if (control.isPunch(this.playerId, Control.PUNCH)) {
            // Just punch
            this.changeState(FighterState.PUNCH);
        } else if (control.isUpKick(this.playerId, Control.UPKICK)) {
            // Just upkick
            this.changeState(FighterState.UPKICK);
        }
    }
    // Jump
    handleJumpState(time) {
        // Vérification des entrées de l'utilisateur pour le mouvement latéral
        let isMovingForward = control.isForward(this.playerId, this.direction);
        let isMovingBackward = control.isBackward(this.playerId, this.direction);
    
        // Ajustement de la vélocité en fonction des entrées
        if (isMovingForward) {
            this.velocity.x = LATERAL_AIR_VELOCITY;
        } else if (isMovingBackward) {
            this.velocity.x = -LATERAL_AIR_VELOCITY;
        }
    
        // Mise à jour de la position verticale
        this.velocity.y += this.gravity * time.delta;
        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.IDLE);
        }
    
        // Mise à jour de la position horizontale
        this.position.x += this.velocity.x * time.delta * this.direction;
    }
    

    // Move
    handleMoveState() {}

    handleGuardInitialState() {
        if (!control.isDown(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }
    }
    

    handlePunchState() {  
          

        if (this.animationFrame === 4) {
            this.boxes.hit = { x: 0, y: 0, width: 0, height: 0 }; // Désactiver la hitbox
            this.changeState(FighterState.IDLE);
        }
    }
    
    handleUpKickState() {
         
        if (this.animationFrame === 4) {
            this.boxes.hit = { x: 0, y: 0, width: 0, height: 0 }; // Désactiver la hitbox

            this.changeState(FighterState.IDLE);
        }
    }

        // Méthode pour gérer l'état ENTRY
        handleEntryState(time) {
            if (this.animationFrame === 10 ) {
                this.changeState(FighterState.IDLE);
            }
        }
        

    gen_map(text, listePosition, pushBox = null, hurtBox = null, hitBox = null) {
        for (let i = 1; i-1 < listePosition.length; i++){
            let frameData = [listePosition[i-1], [listePosition[i-1][2]/2, listePosition[i-1][3]]];
            if (pushBox) {
                frameData.push(pushBox); 
            }
            if (hurtBox) {
                frameData.push(hurtBox);
            }

            if (hitBox) {
                frameData.push(hitBox);
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
        if (!animation) {
            console.error(`Animation not found for state: ${this.currentState}`);
            return;
        }
    
        let [frameKey, frameDelay] = animation[this.animationFrame];
    
        if (time.passed <= this.animationtimer + frameDelay) return;
        this.animationtimer = time.passed;
    
        if (frameDelay <= FrameDelay.FREEZE) return;
        this.animationFrame++;
        let frameData = this.frames.get(frameKey);
        if (frameData && frameData.length > 2) {
            let [pushX, pushY, pushWidth, pushHeight] = frameData[2];
    
            if (this.direction === FighterDirection.RIGHT || this.direction === FighterDirection.LEFT) {
                pushX = -pushX - pushWidth;
            }
    
            this.boxes.push = {
                x: pushX,
                y: pushY,
                width: pushWidth,
                height: pushHeight
            };
                        
            // Mettre à jour la hurtbox avec les données correctes
            if (frameData && frameData.length > 3 && Array.isArray(frameData[3])) {
                // Mettre à jour la hurtbox avec les données correctes
                this.boxes.hurt = [];
                for (let i = 0; i < frameData[3].length; i++) {
                    this.boxes.hurt.push([
                        frameData[3][i][0],
                        frameData[3][i][1],
                        frameData[3][i][2],
                        frameData[3][i][3]
                    ]);
                }    
            }
            
            if (frameData.length > 4 && Array.isArray(frameData[4])) {
                let [hitX, hitY, hitWidth, hitHeight] = frameData[4];

                if (this.direction === FighterDirection.RIGHT || this.direction === FighterDirection.LEFT) {
                    hitX = -hitX - hitWidth;
                }
    
                this.boxes.hit = {
                    x: hitX,
                    y: hitY,
                    width: hitWidth,
                    height: hitHeight
                };
            }
        }
    
        if (this.animationFrame >= animation.length) {
            this.animationFrame = 0;
        }
    }

    updateAttackBoxCollided(time) {
        if (time.passed < this.lastHitTime + this.hitCooldown) {
            return; // Ignore les collisions si le délai n'est pas écoulé
        }
        if (!this.states[this.currentState].attackType) return;
    
        let actualHitBox = getActualBoxDimensions(this.position, this.direction, this.boxes.hit);
    
        for (let hurt of this.opponent.boxes.hurt) {
            let [x, y, width, height] = hurt;
            let actualOpponentHurtBox = getActualBoxDimensions(
                this.opponent.position, 
                this.opponent.direction, 
                {x, y, width, height}
            );
    
            if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) continue;
            this.damageDealt = true;
            if (this.opponent.currentState === FighterState.GUARD) {
                // Le coup est bloqué
                console.log(`${gameState.fighters[this.playerId].id} a bloqué le coup de ${gameState.fighters[this.opponent.playerId].id}`);
                // Vous pouvez ajouter ici des effets visuels ou sonores pour indiquer que le coup a été bloqué
            } else {
                // Le coup touche normalement
                let hurtIndex = this.opponent.boxes.hurt.indexOf(hurt);
                let hurtName = ['head', 'body', 'feet'];
                let strength = this.states[this.currentState].attackStrength;

                gameState.fighters[this.opponent.playerId].score += FighterAttackBaseData[strength].score;
                gameState.fighters[this.playerId].hitPoints -= FighterAttackBaseData[strength].damage;


                console.log(`${gameState.fighters[this.opponent.playerId].id} a frappé ${gameState.fighters[this.playerId].id} au ${hurtName[hurtIndex]}`);
                this.lastHitTime = time.passed; 
            }
        }
    }
    

    drawDebugBox(ctx, dimesions, baseColor){
        if(!Array.isArray(dimesions)) return;

        let [x = 0, y = 0, width = 0, height = 0] = dimesions;


        ctx.beginPath();
        ctx.strokeStyle = baseColor + 'AA';
        ctx.fillStyle = baseColor + '44';
        ctx.fillRect(
            Math.floor(this.position.x + (x * this.direction)) , // x
            Math.floor(this.position.y + y), // y
            width * this.direction , // width
            height // height
        );
        ctx.rect(
            Math.floor(this.position.x + (x * this.direction)) , // x
            Math.floor(this.position.y + y), // y
            width * this.direction , // width
            height // height
        );
        ctx.stroke();
    }
    
    
    draw_debug(ctx) {
        // Dessiner la pushbox
        this.drawDebugBox(ctx, Object.values(this.boxes.push), '#55FF55');

        // Dessiner la hurtbox
        for(let HurtBox of this.boxes.hurt){
            this.drawDebugBox(ctx, HurtBox, '#7777FF');
        }

        // Dessiner la hitbox
        this.drawDebugBox(ctx, Object.values(this.boxes.hit), '#FF5555');


    }
    updateCtx(ctx) {
        // Gérer la limite droite du canvas
        this.position.x = Math.min(this.position.x, ctx.canvas.width - this.boxes.push.width);
    
        // Gérer la limite gauche du canvasq
        this.position.x = Math.max(this.position.x, 0);
    
        // Gestion de la collision avec l'opposant
        if (this.hasCollideWithOpponent()) {
            const repulsionForce = 1; // Ajustez cette valeur en fonction de vos besoins
            if (this.position.x < this.opponent.position.x) {
                this.position.x -= repulsionForce;
                this.opponent.position.x += repulsionForce;
            } else {
                this.position.x += repulsionForce;
                this.opponent.position.x -= repulsionForce;
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
        this.updateAttackBoxCollided(time);
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
        // Configuration et dessin de l'ombre
        let shadowScale = Math.max(0.2, 1 - (STAGE_FLOOR - this.position.y) / 100);
        let shadowWidth = this.boxes.push.width * 0.95 * shadowScale;
        let shadowHeight = 5 * shadowScale; // Hauteur fixe pour l'ombre, scaled
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Couleur de l'ombre
        ctx.beginPath();
        ctx.ellipse(
            this.position.x - 10 * this.direction, 
            STAGE_FLOOR , // Position Y ajustée au sol
            shadowWidth, 
            shadowHeight, 
            0, 
            0, 
            Math.PI * 2
        );
        ctx.fill();
        ctx.save(); // Sauvegarde l'état actuel du contexte
        ctx.translate(Math.floor(this.position.x), Math.floor(this.position.y));
        ctx.scale(this.direction, 1);
        ctx.drawImage(
            this.image, 
            x , y, 
            width  , height , 
            -originX - 20, -originY - 20, 
            width + 20, height +20
        );
        
        ctx.restore(); // Restaure l'état précédent du contexte
        
        //this.draw_debug(ctx);
    }
    
}