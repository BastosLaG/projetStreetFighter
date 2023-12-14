export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');

        this.frames = new Map([
            ['stage-background', [8, 181, 900, 206]],
            ['stage-floor', [8, 393, 900, 72]],
        ]);
    }

    update() {}

    drawFrame(ctx, frame, x, y) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frame)
        ctx.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight ,
            x, y, sourceWidth, sourceHeight,
        );
    }

    draw(ctx, camera){
        this.drawFrame(ctx, 'stage-background', Math.floor( 192 - camera.position.x), -30 -camera.position.y);
        this.drawFrame(ctx, 'stage-floor', Math.floor( 192 - camera.position.x), 176 - camera.position.y);
    }
}

