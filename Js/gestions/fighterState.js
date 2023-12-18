import { HEALTH_MAX_HIT_POINT } from "../constants/battle.js";

export let createDefaultFighterState = (id) => ({
    id,
    score: 1,
    battles: 0,
    hitPoints: HEALTH_MAX_HIT_POINT,
    
});