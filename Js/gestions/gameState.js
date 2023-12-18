
import { FighterId } from "../constants/dfight.js";
import { createDefaultFighterState } from "./fighterState.js";

export let gameState = {
    fighters: [
        createDefaultFighterState(FighterId.MEHDI),
        createDefaultFighterState(FighterId.BASTIEN), 
    ],
};