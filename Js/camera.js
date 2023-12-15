import { SCROLL_BOUNDRY } from './constants/stage.js';

export class Camera {
    constructor(x, y, fighters) {
        this.position = { x, y };
        this.fighters = fighters;
    }

    update(time, ctx) {
        // Update Y position
        this.position.y = -6 + Math.floor(Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10);

        // Update X position
        let lowX = Math.min(this.fighters[1].position.x, this.fighters[0].position.x);
        let highX = Math.max(this.fighters[1].position.x, this.fighters[0].position.x);

        if (highX - lowX > ctx.canvas.width - SCROLL_BOUNDRY * 2) {
            this.centerCameraOnMidpoint(lowX, highX, ctx.canvas.width);
        } else {
            this.scrollCameraWithFighters(time.passed, ctx.canvas.width);
        }
    }

    centerCameraOnMidpoint(lowX, highX, canvasWidth) {
        let midPoint = (highX - lowX) / 2;
        this.position.x = lowX + midPoint - (canvasWidth / 2);
    }

    scrollCameraWithFighters(timePassed, canvasWidth) {
        for (let fighter of this.fighters) {
            if (
                (fighter.position.x < this.position.x + SCROLL_BOUNDRY && fighter.velocity.x * fighter.direction < 0) ||
                (fighter.position.x > this.position.x + canvasWidth - SCROLL_BOUNDRY && fighter.velocity.x * fighter.direction > 0)
            ) {
                this.position.x += fighter.velocity.x * fighter.direction * timePassed;
            }
        }
    }
}
