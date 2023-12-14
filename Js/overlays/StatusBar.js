export class StatusBar {
    constructor(fighters) {
        this.image = document.querySelector('img[alt="misc"]');

        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters;

        this.frames = new Map([
            ['health-bar', [16,18,145,11]],
            ['ko', [161,16,32,14]],

            ['time-0', [16,32,14,16]],
            ['time-1', [32,32,14,16]],
            ['time-2', [48,32,14,16]],
            ['time-3', [64,32,14,16]],
            ['time-4', [80,32,14,16]],
            ['time-5', [96,32,14,16]],
            ['time-6', [112,32,14,16]],
            ['time-7', [128,32,14,16]],
            ['time-8', [144,32,14,16]],
            ['time-9', [160,32,14,16]],

            // Name tags
            
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
        if (time.passed > this.timeTimer + 664){
            if (this.time > 0) this.time -= 1;
            this.timeTimer = time.passed;
        }
    }

    update(time){
        this.updateTime(time);
    }

    drawHealthBars(ctx){
        this.drawFrame(ctx, 'health-bar', 31, 20);
        this.drawFrame(ctx, 'ko', 176, 18);
        this.drawFrame(ctx, 'health-bar', 353, 20, -1);
    }
    
    drawNameTags(ctx){

    }

    drawTime(ctx){
        const timeString = String(this.time).padStart(2, '00');

        this.drawFrame(ctx, `time-${timeString.charAt(0)}`, 178, 33);
        this.drawFrame(ctx, `time-${timeString.charAt(1)}`, 194, 33);
    }

    draw(ctx) {
        this.drawHealthBars(ctx);
        this.drawTime(ctx);
    }
}