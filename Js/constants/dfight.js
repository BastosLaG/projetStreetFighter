export let PUSH_FRICTION = 66;
export let FIGHTER_START_DISTANCE = 88;

export let FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
};

export let FighterState = {
    IDLE: 'idle',
    FORWARDWALK: 'forwardwalk',
    BACKWARDWALK: 'backwardwalk',
    JUMP: 'jump',
    GUARD: 'guard',
    IDLE_TURN: 'idleTurn',
    ENTRY: 'entry',
    PUNCH: 'punch',
    HIT: 'hit',
};

export let frameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
};

export let PushBox = {
    //Bastien pushbox
    IDLEB: [-22, -67, 40, 66], 
    WALKFORWARDB: [-20, -67, 40, 66],
    WALKBACKWARDB: [-22, -67, 40, 66],
    HITB: [-22, -67, 40, 66],
    //Mehdi pushbox
    IDLEM: [-22, -60, 44, 60], 
    WALKFORWARDM: [-8, -69, 27, 66],
    WALKBACKWARDM: [-8, -69, 27, 66],
    HITM: [-22, -60, 44, 60],

    JUMP: [- 18, -115, 32, 55],
};
