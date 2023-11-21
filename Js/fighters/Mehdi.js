import { Fighter } from './Fighter.js';

export class Mehdi extends Fighter {
    constructor(x, y, velocity) {
        super('Mehdi', x, y, velocity);
        this.image = document.querySelector('img[alt="mehdi"]');
    }
}