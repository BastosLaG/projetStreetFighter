export class Stage {
    constructor(source) {
        this.image = new Image();
        this.image.src = source;
    }

    update() { }

    draw(ctx){
        ctx.drawImage(this.image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

