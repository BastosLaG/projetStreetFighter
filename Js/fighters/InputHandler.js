import {Control, controls} from '../constants/control.js';
import {FighterDirection} from '../constants/dfight.js';

let heldkeys = new Set();
let pressedkeys = new Set();

let mappedKeys = controls
    .map(control => Object.values(control.keyboard))
    .flat();
    
function handleKeyDown(event) {
    event.preventDefault();
    heldkeys.add(event.code);
}



function handleKeyUp(event) {
    event.preventDefault();
    heldkeys.delete(event.code);
    pressedkeys.delete(event.code);
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

// fonction pour notifier le changement d'état des touches
export function addKeyStateChangeListener() {
    window.addEventListener('keyup', handleKeyDown);
    window.addEventListener('keydown', handleKeyUp);
}

export let isControlPressed = (id, control) => isKeyPressed(controls[id].keyboard[control]);

export let isKeyDown = (code) => heldkeys.has(code);
export let isKeyUp = (code) => !heldkeys.has(code);

export function isKeyPressed(code) {
    if (pressedkeys.has(code)) {
        return false;
    } else if (heldkeys.has(code)) {
        pressedkeys.add(code);
        return true;
    }
    return false;
}

export let isControlDown = (id, control) => isKeyDown(controls[id].keyboard[control]);

export let isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);
export let isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);
export let isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);
export let isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);

export let isForward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export let isBackward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);

export let isPunch = (id) => isKeyPressed(controls[id].keyboard[Control.PUNCH]);
export let isUpKick = (id) => isKeyPressed(controls[id].keyboard[Control.UPKICK]);
export let isHadoken = (id) => isKeyPressed(controls[id].keyboard[Control.HADOKEN]);

