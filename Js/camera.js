export class Camera {
    constructor(x, y, fighters) {
        this.position = { x, y };
        this.fighters = fighters;

        this.speed = 60; 
    };
    update(time, ctx) {
        this.position.x += this.speed * time.delta;
        if (this.position.x > 640 || this.position.x < 256) this.speed = -this.speed;
    }

    draw(ctx){

    }
}