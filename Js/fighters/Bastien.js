import { Fighter } from './Fighter.js';
import { FighterState, FrameDelay, PushBox, HurtBox, HitBox} from '../constants/dfight.js';
import { FighterDemo } from './FighterDemo.js';

// var jumpsound = new Audio('./assets/sound/Bastien/DBZjumpSoundEffect.mp3');
// jumpsound.volume=0.4;
export class Bastien extends Fighter {
    constructor(x, y, direction, playerId) {
        super(x, y, direction, playerId);

        this.image = document.body.querySelector('img[alt="bastien"]');
        this.frames = new Map();
        
        this.initialVelocity = {
            x: {
                [FighterState.FORWARDWALK]: 200,
                [FighterState.BACKWARDWALK]: -150,
                [FighterState.JUMPFORWARD]: 170,
                [FighterState.JUMPBACKWARD]: -200,
            },
            jump: -350,
        }
        this.gravity = 1000;

        let forwardwalk = [
            [10, 174, 35, 64],
            [54, 171, 37, 67],
            [100, 172, 35, 68],
            [141, 172, 35, 68],
            [180, 172, 35, 68],
            [219, 173, 35, 67]
        ];
        let backwardwalk = [
            [10, 174, 35, 64],
            [54, 171, 37, 67],
            [100, 172, 35, 68],
            [141, 172, 35, 68],
            [180, 172, 35, 68],
            [219, 173, 35, 67]
        ];
        let entry = [
            [83, 9, 39, 71],
            [132, 12, 39, 69],
            [176, 12, 44, 69],
            [236, 15, 34, 66],
            [283, 12, 54, 69],
            [346, 11, 54, 69],
            [409, 10, 54, 70],
            [473, 10, 54, 71],
            [531, 11, 54, 71],
            [594, 15, 54, 68],
            [656, 16, 35, 67]
        ];
        let idle = [
            [83, 98, 35, 68],
            [130, 97, 35, 69],
            [178, 99, 35, 68],
            [226, 98, 36, 67],
            [271, 98, 35, 66],
            [317, 96, 35, 67],
            [363, 96, 35, 68],
            [408, 94, 35, 69]
        ];
        let punch = [
            [8, 246, 46, 63],
            [62, 246, 45, 63],
            [117, 246, 45, 63],
            [170, 245, 63, 63],
            [235, 246, 50, 64],
            [292, 246, 39, 65],
            [340, 243, 38, 68]
        ];
        let upKick = [
            [8, 323, 39, 61],
            [56, 321, 47, 64],
            [109, 318, 60, 66],
            [179, 318, 50, 66],
            [235, 317, 36, 67],
            [288, 316, 34, 68]
        ];
        let lowKick = [
            [14, 396, 43, 68],
            [66, 400, 38, 64],
            [112, 401, 55, 64],
            [175, 402, 35, 65],
            [225, 401, 43, 68],
            [281, 401, 34, 68]
        ];
        let standingPunch = [
            [17, 478, 39, 68],
            [64, 480, 55, 67],
            [127, 481, 39, 68]
        ];
        let crouchUppercut = [
            [11, 584, 34, 52],
            [55, 589, 34, 48],
            [99, 583, 38, 53],
            [143, 575, 45, 64],
            [194, 559, 35, 84],
            [238, 578, 44, 64],
            [289, 588, 38, 54],
            [340, 595, 34, 48],
            [387, 591, 35, 52],
            [434, 579, 34, 64],
            [483, 576, 35, 67]
        ];
        let crouchKick = [
            [14, 656, 41, 48],
            [65, 655, 56, 49],
            [132, 653, 41, 48]
        ];
        let crouchPunch = [
            [216, 652, 38, 50],
            [265, 654, 53, 50],
            [330, 654, 38, 50]
        ];
        let crouchSpinkick = [
            [13, 720, 34, 46],
            [59, 724, 60, 44],
            [135, 725, 38, 42],
            [184, 723, 36, 46],
            [232, 721, 34, 48]
        ];
        let jump = [
            [15, 837, 31, 64],
            [63, 809, 34, 91],
            [109, 793, 33, 106],
            [159, 779, 31, 120],
            [209, 780, 35, 117],
            [257, 787, 33, 110],
            [302, 806, 34, 91],
            [351, 832, 31, 64]
        ];
        let hadoken = [
            [6, 1584, 39, 65],
            [54, 1588, 46, 61],
            [109, 1595, 50, 56],
            [158, 1595, 68, 56],
            [158, 1595, 68, 56],
            [158, 1595, 68, 56]
        ];
        let uppercut = [
            [10, 1811, 35, 64],
            [54, 1816, 37, 58],
            [95, 1809, 43, 66],
            [144, 1790, 36, 86],
            [186, 1775, 36, 101],
            [229, 1768, 30, 108],
            [268, 1771, 32, 105],
            [308, 1809, 32, 67]
        ];
        
        let ki = [
            [10, 1905, 35, 67],
            [53, 1908, 34, 64],
            [98, 1903, 39, 68],
            [144, 1899, 53, 69],
            [209, 1902, 43, 66],
            [263, 1898, 53, 70],
            [324, 1897, 53, 74],
            [389, 1883, 53, 89],
            [459, 1902, 53, 75],
            [520, 1899, 53, 78],
            [576, 1879, 53, 100],
            [5, 2003, 101, 79],
            [112, 1992, 101, 91],
            [215, 1979, 127, 106],
            [347, 1995, 127, 92],
            [484, 1990, 115, 101],
            [5, 2096, 126, 105],
            [144, 2103, 126, 101],
            [284, 2103, 117, 101],
            [410, 2098, 117, 106],
            [538, 2103, 115, 101],
            [5, 2235, 96, 101],
            [111, 2212, 96, 124],
            [220, 2256, 64, 78],
            [303, 2262, 35, 67]
        ];
        
        let guard = [
            [135, 2363, 36, 65]
        ];
        let hit = [
            [23, 2364, 41, 64]
        ];
        let dead = [
            [6, 2448, 45, 81],
            [62, 2464, 65, 61],
            [130, 2500, 68, 27],
            [204, 2482, 65, 44],
            [281, 2499, 66, 22],
            [357, 2497, 50, 26],
            [417, 2473, 34, 51],
            [459, 2460, 34, 67],
            [505, 2467, 43, 61],
            [548, 2474, 51, 53],
            [606, 2460, 35, 68],
            [655, 2463, 35, 67]
        ];
        
        this.frames = new Map([
            ['ki-1', [[10,1905,35,67] , [18, 67]]],
            ['ki-2', [[53,1908,34,64] , [18, 64]]],
            ['ki-3', [[98,1903,39,68] , [18, 68]]],
            ['ki-4', [[144,1899,53,70] , [27, 69]]],
            ['ki-5', [[209,1902,43,66] , [22, 66]]],
            ['ki-6', [[263,1898,53,69] , [27, 69]]],
            ['ki-7', [[324,1897,53,74] , [27, 69]]],
            ['ki-8', [[389,1883,53,89] , [27, 84]]],
            ['ki-9', [[459,1902,53,75] , [27, 70]]],
            ['ki-10', [[520,1899,53,78] , [27, 71]]],
            ['ki-11', [[576,1879,53,100] , [27, 93]]],
            ['ki-12', [[0,2003,101,79] , [54, 71]]],
            ['ki-13', [[106,1992,107,91] , [55, 83]]],
            ['ki-14', [[215,1979,127,106] , [67, 97]]],
            ['ki-15', [[347,1995,127,92] , [67, 83]]],
            ['ki-16', [[484,1990,115,101] , [55, 92]]],
            ['ki-17', [[5,2096,126,105] , [66, 96]]],
            ['ki-18', [[144,2103,126,101] , [66, 92]]],
            ['ki-19', [[284,2103,117,101] , [57, 92]]],
            ['ki-20', [[410,2098,117,106] , [57, 97]]],
            ['ki-21', [[538,2103,115,101] , [55, 92]]],
            ['ki-22', [[5,2235,96,101] , [49, 92]]],
            ['ki-23', [[111,2212,96,124] , [49, 115]]],
            ['ki-24', [[220,2256,64,78] , [34, 71]]],
            ['ki-25', [[303,2262,34,67] , [18, 67]]],
        ]);

        this.animation = {
            'ki': ['ki-1','ki-2','ki-3','ki-4','ki-5','ki-6','ki-7','ki-8','ki-9','ki-10',
                'ki-11','ki-12','ki-13','ki-14','ki-15','ki-16','ki-17','ki-18','ki-19','ki-20',
                'ki-21','ki-22','ki-23','ki-24','ki-25',
            ],
        };

        // this.frames = this.gen_map("ki-", ki);
        this.frames = this.gen_map("hit-", hit);
        this.frames = this.gen_map("dead-", dead);
        this.frames = this.gen_map("forwardwalk-", forwardwalk,PushBox.WALKFORWARDB, HurtBox.HURT_WALKFORWARDB);
        this.frames = this.gen_map("backwardwalk-", backwardwalk,PushBox.WALKBACKWARDB, HurtBox.HURT_WALKBACKWARDB);
        this.frames = this.gen_map("jump-", jump, PushBox.JUMP, HurtBox.HURT_JUMP);
        this.frames = this.gen_map("idle-", idle, PushBox.IDLEB, HurtBox.HURT_IDLEB );
        this.frames = this.gen_map("guard-", guard);
        this.frames = this.gen_map("entry-", entry);
        this.frames = this.gen_map("punch-", punch, PushBox.IDLEB, HurtBox.HURT_IDLEB, HitBox.PUNCHB);
        this.frames = this.gen_map("up_kick-", upKick, PushBox.IDLEB, HurtBox.HURT_IDLEB, HitBox.UPKICKB);

        this.frames = this.gen_map("hadoken-", hadoken);
        this.frames = this.gen_map("low_kick-", lowKick);
        this.frames = this.gen_map("uppercut-", uppercut);
        this.frames = this.gen_map("crouch_kick-", crouchKick);
        this.frames = this.gen_map("crouch_punch-", crouchPunch);
        this.frames = this.gen_map("standing_punch-", standingPunch);
        this.frames = this.gen_map("crouch_uppercut-", crouchUppercut);
        this.frames = this.gen_map("crouch_spinkick-", crouchSpinkick);
        
        this.animation = this.gen_AnimationObject([FighterState.FORWARDWALK], "forwardwalk", 6, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.BACKWARDWALK], "backwardwalk", 6, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.JUMP], "jump", 8, 130, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.IDLE], "idle", 8, 130, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.GUARD], "guard", 1, 100, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.ENTRY], "entry", 11, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.PUNCH], "punch", 7, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject(FighterState.HIT, "hit", 1, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.UPKICK], "up_kick", 6, 80,  FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject(FighterState.HADOKENs, "hadoken", 8, 80, FrameDelay.FREEZE);


        // this.animation = this.gen_AnimationObject("ki", "ki", 25);
        // this.animation = this.gen_AnimationObject("hit", "hit", 1);
        // this.animation = this.gen_AnimationObject("dead", "dead", 12);
        // this.animation = this.gen_AnimationObject("punch", "punch", 7);
        // this.animation = this.gen_AnimationObject("hadoken", "hadoken", 8);
        // this.animation = this.gen_AnimationObject("up_kick", "up_kick", 6);
        // this.animation = this.gen_AnimationObject("low_kick", "low_kick", 6);
        // this.animation = this.gen_AnimationObject("uppercut", "uppercut", 8);
        // this.animation = this.gen_AnimationObject("crouch_kick", "crouch_kick", 3);
        // this.animation = this.gen_AnimationObject("crouch_punch", "crouch_punch", 3);
        // this.animation = this.gen_AnimationObject("standing_punch", "standing_punch", 3);
        // this.animation = this.gen_AnimationObject("crouch_spinkick", "crouch_spinkick", 5);
        // this.animation = this.gen_AnimationObject("crouch_uppercut", "crouch_uppercut", 11);
    }

}

// var jumpsound = new Audio('./assets/sound/Bastien/DBZjumpSoundEffect.mp3');
// jumpsound.volume=0.4;

export class BastienDemo extends FighterDemo {
    constructor(x, y, direction, playerId) {
        super(x, y, direction, playerId);

        this.image = document.body.querySelector('img[alt="bastien"]');
        this.frames = new Map();
        
        this.initialVelocity = {
            x: {
                [FighterState.FORWARDWALK]: 200,
                [FighterState.BACKWARDWALK]: -150,
                [FighterState.JUMPFORWARD]: 170,
                [FighterState.JUMPBACKWARD]: -200,
            },
            jump: -350,
        }
        this.gravity = 1000;

        let forwardwalk = [
            [10, 174, 35, 64],
            [54, 171, 37, 67],
            [100, 172, 35, 68],
            [141, 172, 35, 68],
            [180, 172, 35, 68],
            [219, 173, 35, 67]
        ];
        let backwardwalk = [
            [10, 174, 35, 64],
            [54, 171, 37, 67],
            [100, 172, 35, 68],
            [141, 172, 35, 68],
            [180, 172, 35, 68],
            [219, 173, 35, 67]
        ];
        let entry = [
            [83, 9, 39, 71],
            [132, 12, 39, 69],
            [176, 12, 44, 69],
            [236, 15, 34, 66],
            [283, 12, 54, 69],
            [346, 11, 54, 69],
            [409, 10, 54, 70],
            [473, 10, 54, 71],
            [531, 11, 54, 71],
            [594, 15, 54, 68],
            [656, 16, 35, 67]
        ];
        let idle = [
            [83, 98, 35, 68],
            [130, 97, 35, 69],
            [178, 99, 35, 68],
            [226, 98, 36, 67],
            [271, 98, 35, 66],
            [317, 96, 35, 67],
            [363, 96, 35, 68],
            [408, 94, 35, 69]
        ];
        let punch = [
            [8, 246, 46, 63],
            [62, 246, 45, 63],
            [117, 246, 45, 63],
            [170, 245, 63, 63],
            [235, 246, 50, 64],
            [292, 246, 39, 65],
            [340, 243, 38, 68]
        ];
        let upKick = [
            [8, 323, 39, 61],
            [56, 321, 47, 64],
            [109, 318, 60, 66],
            [179, 318, 50, 66],
            [235, 317, 36, 67],
            [288, 316, 34, 68]
        ];
        let lowKick = [
            [14, 396, 43, 68],
            [66, 400, 38, 64],
            [112, 401, 55, 64],
            [175, 402, 35, 65],
            [225, 401, 43, 68],
            [281, 401, 34, 68]
        ];
        let standingPunch = [
            [17, 478, 39, 68],
            [64, 480, 55, 67],
            [127, 481, 39, 68]
        ];
        let crouchUppercut = [
            [11, 584, 34, 52],
            [55, 589, 34, 48],
            [99, 583, 38, 53],
            [143, 575, 45, 64],
            [194, 559, 35, 84],
            [238, 578, 44, 64],
            [289, 588, 38, 54],
            [340, 595, 34, 48],
            [387, 591, 35, 52],
            [434, 579, 34, 64],
            [483, 576, 35, 67]
        ];
        let crouchKick = [
            [14, 656, 41, 48],
            [65, 655, 56, 49],
            [132, 653, 41, 48]
        ];
        let crouchPunch = [
            [216, 652, 38, 50],
            [265, 654, 53, 50],
            [330, 654, 38, 50]
        ];
        let crouchSpinkick = [
            [13, 720, 34, 46],
            [59, 724, 60, 44],
            [135, 725, 38, 42],
            [184, 723, 36, 46],
            [232, 721, 34, 48]
        ];
        let jump = [
            [15, 837, 31, 64],
            [63, 809, 34, 91],
            [109, 793, 33, 106],
            [159, 779, 31, 120],
            [209, 780, 35, 117],
            [257, 787, 33, 110],
            [302, 806, 34, 91],
            [351, 832, 31, 64]
        ];
        let hadoken = [
            [6, 1584, 39, 65],
            [54, 1588, 46, 61],
            [109, 1595, 50, 56],
            [158, 1595, 68, 56],
            [158, 1595, 68, 56],
            [158, 1595, 68, 56]
        ];
        let uppercut = [
            [10, 1811, 35, 64],
            [54, 1816, 37, 58],
            [95, 1809, 43, 66],
            [144, 1790, 36, 86],
            [186, 1775, 36, 101],
            [229, 1768, 30, 108],
            [268, 1771, 32, 105],
            [308, 1809, 32, 67]
        ];
        
        let ki = [
            [10, 1905, 35, 67],
            [53, 1908, 34, 64],
            [98, 1903, 39, 68],
            [144, 1899, 53, 69],
            [209, 1902, 43, 66],
            [263, 1898, 53, 70],
            [324, 1897, 53, 74],
            [389, 1883, 53, 89],
            [459, 1902, 53, 75],
            [520, 1899, 53, 78],
            [576, 1879, 53, 100],
            [5, 2003, 101, 79],
            [112, 1992, 101, 91],
            [215, 1979, 127, 106],
            [347, 1995, 127, 92],
            [484, 1990, 115, 101],
            [5, 2096, 126, 105],
            [144, 2103, 126, 101],
            [284, 2103, 117, 101],
            [410, 2098, 117, 106],
            [538, 2103, 115, 101],
            [5, 2235, 96, 101],
            [111, 2212, 96, 124],
            [220, 2256, 64, 78],
            [303, 2262, 35, 67]
        ];
        
        let guard = [
            [135, 2363, 36, 65]
        ];
        let hit = [
            [23, 2364, 41, 64]
        ];
        let dead = [
            [6, 2448, 45, 81],
            [62, 2464, 65, 61],
            [130, 2500, 68, 27],
            [204, 2482, 65, 44],
            [281, 2499, 66, 22],
            [357, 2497, 50, 26],
            [417, 2473, 34, 51],
            [459, 2460, 34, 67],
            [505, 2467, 43, 61],
            [548, 2474, 51, 53],
            [606, 2460, 35, 68],
            [655, 2463, 35, 67]
        ];
        
        this.frames = new Map([
            ['ki-1', [[10,1905,35,67] , [18, 67]]],
            ['ki-2', [[53,1908,34,64] , [18, 64]]],
            ['ki-3', [[98,1903,39,68] , [18, 68]]],
            ['ki-4', [[144,1899,53,70] , [27, 69]]],
            ['ki-5', [[209,1902,43,66] , [22, 66]]],
            ['ki-6', [[263,1898,53,69] , [27, 69]]],
            ['ki-7', [[324,1897,53,74] , [27, 69]]],
            ['ki-8', [[389,1883,53,89] , [27, 84]]],
            ['ki-9', [[459,1902,53,75] , [27, 70]]],
            ['ki-10', [[520,1899,53,78] , [27, 71]]],
            ['ki-11', [[576,1879,53,100] , [27, 93]]],
            ['ki-12', [[0,2003,101,79] , [54, 71]]],
            ['ki-13', [[106,1992,107,91] , [55, 83]]],
            ['ki-14', [[215,1979,127,106] , [67, 97]]],
            ['ki-15', [[347,1995,127,92] , [67, 83]]],
            ['ki-16', [[484,1990,115,101] , [55, 92]]],
            ['ki-17', [[5,2096,126,105] , [66, 96]]],
            ['ki-18', [[144,2103,126,101] , [66, 92]]],
            ['ki-19', [[284,2103,117,101] , [57, 92]]],
            ['ki-20', [[410,2098,117,106] , [57, 97]]],
            ['ki-21', [[538,2103,115,101] , [55, 92]]],
            ['ki-22', [[5,2235,96,101] , [49, 92]]],
            ['ki-23', [[111,2212,96,124] , [49, 115]]],
            ['ki-24', [[220,2256,64,78] , [34, 71]]],
            ['ki-25', [[303,2262,34,67] , [18, 67]]],
        ]);

        this.animation = {
            'ki': ['ki-1','ki-2','ki-3','ki-4','ki-5','ki-6','ki-7','ki-8','ki-9','ki-10',
                'ki-11','ki-12','ki-13','ki-14','ki-15','ki-16','ki-17','ki-18','ki-19','ki-20',
                'ki-21','ki-22','ki-23','ki-24','ki-25',
            ],
        };

        // this.frames = this.gen_map("ki-", ki);
        this.frames = this.gen_map("hit-", hit);
        this.frames = this.gen_map("dead-", dead);
        this.frames = this.gen_map("forwardwalk-", forwardwalk,PushBox.WALKFORWARDB, HurtBox.HURT_WALKFORWARDB);
        this.frames = this.gen_map("backwardwalk-", backwardwalk,PushBox.WALKBACKWARDB, HurtBox.HURT_WALKBACKWARDB);
        this.frames = this.gen_map("jump-", jump, PushBox.JUMP, HurtBox.HURT_JUMP);
        this.frames = this.gen_map("idle-", idle, PushBox.IDLEB, HurtBox.HURT_IDLEB );
        this.frames = this.gen_map("guard-", guard);
        this.frames = this.gen_map("entry-", entry);
        this.frames = this.gen_map("punch-", punch, PushBox.IDLEB, HurtBox.HURT_IDLEB, HitBox.PUNCHB);
        this.frames = this.gen_map("up_kick-", upKick, PushBox.IDLEB, HurtBox.HURT_IDLEB, HitBox.UPKICKB);

        this.frames = this.gen_map("hadoken-", hadoken);
        this.frames = this.gen_map("low_kick-", lowKick);
        this.frames = this.gen_map("uppercut-", uppercut);
        this.frames = this.gen_map("crouch_kick-", crouchKick);
        this.frames = this.gen_map("crouch_punch-", crouchPunch);
        this.frames = this.gen_map("standing_punch-", standingPunch);
        this.frames = this.gen_map("crouch_uppercut-", crouchUppercut);
        this.frames = this.gen_map("crouch_spinkick-", crouchSpinkick);
        
        this.animation = this.gen_AnimationObject([FighterState.FORWARDWALK], "forwardwalk", 6, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.BACKWARDWALK], "backwardwalk", 6, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.JUMP], "jump", 8, 130, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.IDLE], "idle", 8, 130, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.GUARD], "guard", 1, 100, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.ENTRY], "entry", 11, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.PUNCH], "punch", 7, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject(FighterState.HIT, "hit", 1, 80, FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject([FighterState.UPKICK], "up_kick", 6, 80,  FrameDelay.FREEZE);
        this.animation = this.gen_AnimationObject(FighterState.HADOKENs, "hadoken", 8, 80, FrameDelay.FREEZE);


        // this.animation = this.gen_AnimationObject("ki", "ki", 25);
        // this.animation = this.gen_AnimationObject("hit", "hit", 1);
        // this.animation = this.gen_AnimationObject("dead", "dead", 12);
        // this.animation = this.gen_AnimationObject("punch", "punch", 7);
        // this.animation = this.gen_AnimationObject("hadoken", "hadoken", 8);
        // this.animation = this.gen_AnimationObject("up_kick", "up_kick", 6);
        // this.animation = this.gen_AnimationObject("low_kick", "low_kick", 6);
        // this.animation = this.gen_AnimationObject("uppercut", "uppercut", 8);
        // this.animation = this.gen_AnimationObject("crouch_kick", "crouch_kick", 3);
        // this.animation = this.gen_AnimationObject("crouch_punch", "crouch_punch", 3);
        // this.animation = this.gen_AnimationObject("standing_punch", "standing_punch", 3);
        // this.animation = this.gen_AnimationObject("crouch_spinkick", "crouch_spinkick", 5);
        // this.animation = this.gen_AnimationObject("crouch_uppercut", "crouch_uppercut", 11);
    }

}
