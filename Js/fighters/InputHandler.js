let heldkeys = new Set();

function handleKeyDown(event) {
    console.log(event)
    event.preventDefault();
    heldkeys.add(event.code);
}

function handleKeyUp(event) {
    event.preventDefault();
    heldkeys.delete(event.code);
}

export function registerKeyboardEvent() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

// fonction pour notifier le changement d'état des touches
export function addKeyStateChangeListener(callback) {
    window.addEventListener('keyup', handleKeyDown);
    window.addEventListener('keydown', handleKeyUp);
}

export let isKeyDown = (code) => heldkeys.has(code);
export let isKeyUp = (code) => !heldkeys.has(code);

export let isLeft = (id) => !isKeyDown(controls[id].keyboard[Controls.LEFT]);
export let isRight = (id) => !isKeyDown(controls[id].keyboard[Controls.RIGHT]);
export let isUp = (id) => !isKeyDown(controls[id].keyboard[Controls.UP]);
export let isDown = (id) => !isKeyDown(controls[id].keyboard[Controls.DOWN]);


