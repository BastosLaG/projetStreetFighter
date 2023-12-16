export class Stage {
    constructor(source) {
        this.image = new Image();
        this.image.src = source;
        // this.image = document.querySelector('img[alt="background"]');

        // this.frames = new Map([
        //     ['stage-background', [8, 181, 900, 206]],
        //     ['stage-floor', [8, 393, 900, 72]],
        // ]);
    }

    // update() { }

    // drawFrame(ctx, frameKey, x, y) {
    //     drawFrame(ctx, this.image, this.frames.get(frameKey), x, y, direction);
    // }

    draw(ctx, camera){
        ctx.drawImage(this.image, 0, 13, ctx.canvas.width, ctx.canvas.height  - camera.position.y);
        // this.drawFrame(ctx, 'stage-background', Math.floor( 192 - camera.position.x), 31 -camera.position.y);
        // this.drawFrame(ctx, 'stage-floor', Math.floor( 192 - camera.position.x), 185 - camera.position.y);
    }
}
