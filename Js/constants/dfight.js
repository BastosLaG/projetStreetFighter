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
    UPKICK: 'upkick',
    HIT: 'hit',
};

export let frameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
};

export let FrameDelay = {
    FREEZE: 0,
    TRANSISTION: -2,    
}

export let FighterAttackType = {
    PUNCH: 'punch',
    KICK: 'kick',
}

export let FighterAttackStrength = {
    LIGHT: 'light',
    MEDIUM: 'medium',
    HEAVY: 'heavy',
};

export let FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
        score: 100, 
        damage: 12,
    }, 
    [FighterAttackStrength.MEDIUM]: {
        score: 300, 
        damage: 20,
    },
    [FighterAttackStrength.LIGHT]: {
        score: 100, 
        damage: 28,
    }
};

export let PushBox = {
    //Bastien pushbox

    IDLEB: [-18, -67, 35, 66], 
    WALKFORWARDB:[-18, -67, 35, 66], 
    WALKBACKWARDB: [-18, -67, 35, 66], 
    HITB: [-18, -67, 35, 66], 

    //Mehdi pushbox
    IDLEM: [-18, -60, 37, 60], 
    WALKFORWARDM: [-8, -69, 27, 66],
    WALKBACKWARDM: [-8, -69, 27, 66],
    HITM: [-22, -60, 44, 60],

    JUMP: [- 18, -115, 32, 55],
};
export let HurtBox = {
    HURT_IDLEB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
    HURT_WALKFORWARDB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
    HURT_WALKBACKWARDB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
    HURT_UPKICKB: [[22, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
    
    HURT_IDLEM: [[-8, -65, 20, 16], [-16, -47, 30, 26], [-16, -20, 30, 20]],
    HURT_WALKFORWARDM: [[-8, -65, 20, 16], [-8, -50, 20, 28], [-8, -20, 20, 20]],
    HURT_WALKBACKWARDM: [[-8, -65, 20, 16], [-8, -50, 20, 28], [-8, -20, 20, 20]],
    HURT_UPKICKM: [[22, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],

    
    HURT_JUMP: [[- 18, -115, 32, 55], [- 18, -115, 32, 55], [- 18, -115, 32, 55]],

};


export let HitBox = {
    //Bastien hitbox
    PUNCHB: [15, -55, 20, 15],
    UPKICKB: [22, -70, 20, 16],

    //Mehdi hitbox
    PUNCHM: [-35, -48, 20, 15],
    UPKICKM: [-40, -70, 20, 16],

};

/*
HURT_IDLEB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
HURT_WALKFORWARDB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],
HURT_WALKBACKWARDB: [[-8, -70, 20, 16], [-12, -55, 26, 35], [-12, -20, 26, 20]],

HURT_IDLEM: [[-8, -65, 20, 16], [-16, -47, 30, 26], [-16, -20, 30, 20]],
HURT_WALKFORWARDM: [[-8, -65, 20, 16], [-8, -50, 20, 28], [-8, -20, 20, 20]],
HURT_WALKBACKWARDM: [[-8, -65, 20, 16], [-8, -50, 20, 28], [-8, -20, 20, 20]],

HURT_JUMP: [[- 18, -115, 32, 55], [- 18, -115, 32, 55], [- 18, -115, 32, 55]],
*/