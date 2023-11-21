import { Fighter } from './Fighter.js';

export class Mehdi extends Fighter {

    handleKey(event) {
        if (event.key === "ArrowLeft") {
            this.animationFrame++;
            console.log(this.animationFrame);
        } else if (event.key === "ArrowRight") {
            this.animationFrame--;
            console.log(this.animationFrame);
        } else if (event.key === "ArrowUp" && !this.jumping) {
            this.jumping = true;
            this.velocityY = this.jumpSpeed;
            this.state = 'jump';
        }
    }

    constructor(x, y, velocity) {
        super('Mehdi', x, y, velocity);
        this.image = document.querySelector('img[alt="mehdi"]');
        this.frames = new Map();
        this.state = "entry";

    
    let entry = [
        [83, 9, 34, 67],//1
        [126, 9, 34, 67],//2
        [169, 10, 34, 67],//3
        [215, 10, 34, 67],//4
        [265, 9, 34, 67],//5
        [310, 8, 34, 67],//6
        [353, 9, 34, 67],//7
        [399, 9, 34, 67],//8
        [449, 8, 34, 67],//8
        [492, 8, 34, 67],//9
        [533, 7, 38, 67],//10
        [575, 7, 43, 67],//11
        [618, 6, 41, 67],//12
        [76, 94, 42, 67],//13
        [125, 94, 46, 67],//14
        [178, 95, 40, 67],//15
        [222, 93, 43, 67],//16
        [265, 93, 47, 67],//17
        [317, 94, 43, 67],//18
        [369, 93, 38, 67],//19
        [415, 96, 38, 65],//20
        [464, 101, 49, 61],//21
        [525, 103, 44, 60]//22
    ];

    let idle = [
        [12, 173, 48, 62],
        [68, 175, 49, 61],
        [131, 177, 44, 60],
        [186, 178, 45, 59],
        [245, 177, 44, 60],
        [296, 179, 49, 61],
        [357, 178, 48, 62]
    ];

    this.frames = this.gen_map("entry-", entry);
    this.frames = this.gen_map("idle-", idle);


    this.animation = this.gen_AnimationObject("entry", "entry", 23);
    this.animation = this.gen_AnimationObject("idle", "idle", 7);

    }
}
