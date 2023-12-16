import { HEALTH_COLOR, HEALTH_DAMAGE_COLOR, HEALTH_MAX_HIT_POINT, TIME_DELAY, TIME_FLASH_DELAY, TIME_FRAME_KEYS } from "../constants/battle.js";

export class StatusBar {
    constructor(fighters) {
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

        this.fighters = fighters;

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

    updateHealthBars(time){
        for (let i in this.healthBars){
            if (this.healthBars[i].hitPoints <= this.fighters[i].hitPoints) continue; 
            this.healthBars[i].hitPoints = Math.max(0, this.healthBars[i].hitPoints - (time.passed * FPS));
        }
    }

    update(time){
        this.updateTime(time);
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