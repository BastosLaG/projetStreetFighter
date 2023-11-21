import { Fighter } from './Fighter.js';

export class Tomas extends Fighter {
    constructor(x, y, velocity) {
        super('Tomas', x, y, velocity);
        this.image = document.body.querySelector('img[alt="tomas"]');
    }
}