export let Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    PUNCH: 'punch',
    UPKICK: 'upkick',

};

export let controls = [
    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.PUNCH]: 'ControlRight',
            [Control.UPKICK]: 'ShiftRight',

        },
    },
    {
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
            [Control.PUNCH]: 'KeyE',
            [Control.UPKICK]: 'KeyF',
        },
    },
];
