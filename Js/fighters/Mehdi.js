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

    let walk = [
        [13, 253, 47, 70],
        [65, 255, 43, 66],
        [119, 255, 46, 66],
        [176, 250, 46, 69],
        [228, 247, 46, 70],
        [279, 251, 42, 66],
        [327, 252, 49, 66],
        [380, 249, 46, 69]
    ];

    let upkick = [
        [16, 426, 47, 62],
        [78, 428, 47, 61],
        [141, 433, 47, 56],
        [184, 425, 74, 63],
        [271, 425, 52, 64],
        [335, 433, 47, 56],
        [393, 434, 47, 53],
        [442, 426, 47, 62],
        [496, 426, 52, 62],
        [555, 428, 49, 61],
        [620, 431, 44, 60]
    ];

    let punch = [
        [13, 503, 44, 60],
        [61, 504, 80, 56],
        [144, 503, 62, 57],
        [213, 503, 53, 59],
        [278, 500, 49, 62]
    ];

    let lowkick = [
        [10, 582, 56, 61],
        [83, 580, 42, 65],
        [133, 577, 74, 68],
        [211, 581, 42, 65],
        [270, 584, 55, 62],
        [339, 586, 49, 61]
    ];

    let jump = [
        [14, 1077, 46, 51],
        [64, 1038, 42, 94],
        [108, 1020, 50, 112],
        [163, 1020, 42, 112],
        [218, 1013, 42, 119],
        [268, 1008, 42, 124],
        [315, 1010, 48, 122],
        [370, 1028, 41, 104],
        [423, 1080, 46, 51]
    ];

    this.frames = this.gen_map("entry-", entry);
    this.frames = this.gen_map("idle-", idle);
    this.frames = this.gen_map("walk-", walk);
    this.frames = this.gen_map("upkick-", upkick);
    this.frames = this.gen_map("punch-", punch);
    this.frames = this.gen_map("lowkick-", lowkick);
    this.frames = this.gen_map("jump-", jump);

    this.animation = this.gen_AnimationObject("entry", "entry", 23);
    this.animation = this.gen_AnimationObject("idle", "idle", 7);
    this.animation = this.gen_AnimationObject("walk", "walk", 8);
    this.animation = this.gen_AnimationObject("upkick", "upkick", 11);
    this.animation = this.gen_AnimationObject("punch", "punch", 5);
    this.animation = this.gen_AnimationObject("lowkick", "lowkick", 6);
    this.animation = this.gen_AnimationObject("jump", "jump", 9);
    }
}
