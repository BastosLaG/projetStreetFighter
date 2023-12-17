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
    HADOKEN: 'hadoken'
};

export let FighterId = {
    BASTIEN: 'bastien',
    MEHDI: 'mehdi',
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
    [FighterAttackStrength.HEAVY]: {
        score: 100, 
        damage: 28,
    }
};

export let PushBox = {
    //Bastien pushbox

    IDLEB: [-14, -67, 30, 60], 
    WALKFORWARDB:[-14, -67, 30, 60],
    WALKBACKWARDB: [-14, -67, 30, 60],
    HITB: [-14, -67, 30, 60],

    //Mehdi pushbox
    IDLEM: [-14, -67, 30, 60],
    WALKFORWARDM:[-14, -67, 30, 60],
    WALKBACKWARDM:[-14, -67, 30, 60],
    HITM: [-14, -67, 30, 60],

    JUMP: [- 18, -115, 32, 55],
};
export let HurtBox = {
    HURT_IDLEB: [[-15, -85, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_WALKFORWARDB:[[-15, -85, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_WALKBACKWARDB: [[-15, -85, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_UPKICKB:[[-15, -85, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    
    HURT_IDLEM: [[-18, -80, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_WALKFORWARDM: [[-18, -80, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_WALKBACKWARDM:[[-18, -80, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],
    HURT_UPKICKM:[[-18, -80, 20, 16], [-28, -69, 40, 50], [-28, -20, 40, 20]],

    
    HURT_JUMP: [[- 18, -115, 32, 55], [- 18, -115, 32, 55], [- 18, -115, 32, 55]],

};


export let HitBox = {
    //Bastien hitbox
    PUNCHB: [-35, -59, 20, 15],
    UPKICKB: [-40, -89, 20, 16],

    //Mehdi hitbox
    PUNCHM: [-35, -59, 20, 15],
    UPKICKM: [-40, -89, 20, 16],

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