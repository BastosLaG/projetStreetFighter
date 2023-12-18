import { HEALTH_COLOR, HEALTH_DAMAGE_COLOR, HEALTH_MAX_HIT_POINT, TIME_DELAY, TIME_FLASH_DELAY, TIME_FRAME_KEYS } from "../constants/battle.js";
import { gameState } from "../gestions/gameState.js";

let FPS = 60;
export class StatusBar {
    constructor() {
        this.image = document.querySelector('img[alt="misc"]');

        this.time = 99;
        this.timeTimer = 0;
        this.timeFlashTimer = 0;
        this.useFlashFrames = false;

        this.healthBars = [{
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINT,
        }, {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINT,
        }];


        this.frames = new Map([
            ['health-bar', [16,18,145,11]],
            ['ko', [161,16,32,14]],
        
            [`${TIME_FRAME_KEYS[0]}-0`, [16,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-1`, [32,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-2`, [48,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-3`, [64,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-4`, [80,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-5`, [96,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-6`, [112,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-7`, [128,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-8`, [144,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-9`, [160,32,14,16]],
            
            [`${TIME_FRAME_KEYS[1]}-0`, [16,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-1`, [32,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-2`, [48,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-3`, [64,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-4`, [80,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-5`, [96,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-6`, [112,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-7`, [128,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-8`, [144,32,14,16]],
            [`${TIME_FRAME_KEYS[1]}-9`, [160,32,14,16]],
            
        ]);
        this.name = gameState.fighters.map (({id}) => 'tag-${toLowerCase()}');
    }

		
    drawFrame(ctx, frame, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frame)
        ctx.scale(direction, 1);
        ctx.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x*direction, y, sourceWidth, sourceHeight,
        );
        ctx.setTransform(1,0,0,1,0,0);
    }

    updateTime(time){
        if (time.passed > this.timeTimer + TIME_DELAY){
            this.time -= 1;
            this.timeTimer = time.passed;
        }
        if (
            this.time < 15 && this.time > -1 && time.passed > this.timeFlashTimer + TIME_FLASH_DELAY) {
            this.useFlashFrames = !this.useFlashFrames;
            this.timeFlashTimer = time.passed;
        }
    }

	playKO(winnerId) {
        if (this.koPlayed) return; // Empêche la méthode de s'exécuter si elle a déjà été appelée

        this.koPlayed = true; // Marquer la vidéo comme jouée
        console.log(`Le joueur ${winnerId} a gagné. Lecture de la vidéo.`);

        let videoSrc = winnerId === "0" ? "./assets/player2Win.mp4" : "./assets/player1Win.mp4";
        let videoElement = document.getElementById('KO');
        videoElement.src = videoSrc;
        videoElement.load();

        videoElement.style.display = 'block';
        videoElement.play();
        videoElement.onended = () => {
            console.log('Fin de la vidéo. Redirection vers index.html');
            window.location.href = 'index.html';
        };
    }
	updateHealthBars(){
		let playerKOed = false;
        let winner; 
		for (let index in this.healthBars){
			if(this.healthBars[index].hitPoints <= gameState.fighters[index].hitPoints) continue;
				this.healthBars[index].hitPoints = Math.max(0, this.healthBars[index].hitPoints - 2);
			if(this.healthBars[index].hitPoints <= 0) {
                console.log(index);
                winner = index
                playerKOed = true;
			}
		}
	
		if(playerKOed){
			this.playKO(winner);
		}
	}
 
    update(time){
        this.updateTime(time);
        this.updateHealthBars();
    }

    drawHealthBars(ctx){
        this.drawFrame(ctx, 'health-bar', 31, 20);
        this.drawFrame(ctx, 'ko', 176, 18);
        this.drawFrame(ctx, 'health-bar', 353, 20, -1);

        ctx.fillStyle = HEALTH_DAMAGE_COLOR;

        ctx.beginPath();
        ctx.fillRect(
            32, 21, 
            HEALTH_MAX_HIT_POINT - Math.floor(this.healthBars[0].hitPoints), 9,
        );
        ctx.fillRect(
            208 + Math.floor(this.healthBars[1].hitPoints), 21, 
            HEALTH_MAX_HIT_POINT - Math.floor(this.healthBars[1].hitPoints), 9,
        );
    }
    
    drawNameTags(ctx){

    }

    drawScore(ctx, score, x){
        if(score < 1)return;

        let strValue = String(score);
        let buffer = ((6 * 12) - String(score).length * 12);

        for (let i = 0; i < strValue.length; i++){
            this.drawFrame(ctx, `score-${strValue[i]}`, x + buffer + (i * 12), 1);
        }

    }

    drawScores(ctx){
        this.drawScore(ctx, gameState.fighters[0].score, 32);
        this.drawScore(ctx, gameState.fighters[1].score, 352);
    }

    drawTime(ctx){
        const timeString = String(Math.max(this.time, 0)).padStart(2, '00');
        const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];

        this.drawFrame(ctx, `${flashFrame}-${timeString.charAt(0)}`, 178, 33);
        this.drawFrame(ctx, `${flashFrame}-${timeString.charAt(1)}`, 194, 33);
    }

    draw(ctx) {
        this.drawHealthBars(ctx);
        this.drawTime(ctx);
        
    }
}