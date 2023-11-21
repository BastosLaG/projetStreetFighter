import { Fighter } from './Fighter.js';

export class Ludovic extends Fighter {
    constructor(x, y, velocity) {
        super('Ludovic', x, y, velocity);
        this.image = document.querySelector('img[alt="ludovic"]');
        this.frames = new Map([
            ['forwards-1', [[10,174,35,64] , [18, 64]]],
            ['forwards-2', [[54,171,37,67] , [19, 67]]],
            ['forwards-3', [[100,172,35,68] , [18, 68]]],
            ['forwards-4', [[141,172,35,68] , [18, 68]]],
            ['forwards-5', [[180,172,35,68] , [18, 68]]],
            ['forwards-6', [[219,173,35,67] , [18, 67]]],
        ]);

        this.animation = {
            'walk': ['forwards-1','forwards-2','forwards-3','forwards-4','forwards-5','forwards-6'],
        };
    }
}