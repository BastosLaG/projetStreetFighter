export class FpsCounter {
    constructor() {
        this.fps = 0;
        this.frameTimes = [];
        this.avgFrameTime = 0;
        this.maxSamples = 60; // nombre de frames pour calculer la moyenne
    }

    update(time, ctx) {
        this.frameTimes.push(1 / time.delta);
        if (this.frameTimes.length > this.maxSamples) {
            this.frameTimes.shift(); // retirer le plus ancien si on dépasse le max
        }

        this.avgFrameTime = this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
        this.fps = Math.trunc(this.avgFrameTime);
    }

    draw(ctx) {
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        let text = `${this.fps}`;
        let metrics = ctx.measureText(text);
        let textWidth = metrics.width;
        let x = ctx.canvas.width - textWidth - 10; // positionner en haut à droite
        let y = 220;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // fond semi-transparent
        ctx.fillRect(x - 5, 205, textWidth + 10, 20);

        ctx.fillStyle = "#00FF00";
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
    }
}
