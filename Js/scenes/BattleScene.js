import { FpsCounter } from "../gestions/FpsCounter.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { Camera } from "../camera.js";
import { Stage } from "../gestions/Stage.js";
import { Bastien } from "../fighters/Bastien.js";
import { Mehdi } from "../fighters/Mehdi.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "../constants/stage.js";
import { FighterId } from "../constants/dfight.js";
import { gameState } from "../state/gameState.js";

export class BattleScene {
    fighters = [];
    camera = undefined;
    shadows = [];
    entities = [];

    constructor(){
        this.stage = new Stage("./assets/Background.jpg");

        this.overlays = [
            new StatusBar(this.fighters),
            new FpsCounter(),
        ];
        this.fighters = this.getFighterEntities();
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - 192, 16, this.fighters);
        // this.shadows = this.fighters.map(fighter => new ShadowRoot(fighter));
    }

    getFighterEntityClass(id) {
        switch (id) {
            case FighterId.BASTIEN:
                return Bastien;
            case FighterId.MEHDI:
                return Mehdi;
            default: 
                throw new Error("Tu veux faire apparaitre quel NO-name ???");
        }
    }

    getFighterEntity(fighterState, index) {
        let FighterEntityClass = this.getFighterEntityClass(fighterState.id);
        return new FighterEntityClass(index);
    }

    getFighterEntities(){
        let fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));

        fighterEntities[1].opponent = fighterEntities[0];
        fighterEntities[0].opponent = fighterEntities[1];

        return fighterEntities;
    }

    updateFighters(time, ctx) {
        for(let fighter of this.fighters){
            fighter.update(time, ctx);
        }
    }

    updateShadows(time, ctx) {
        for(let shadow of this.shadows){
            shadow.update(time, ctx, this.camera);
        }
    }

    updateEntities(time, ctx) {
        for(let entitie of this.entities){
            entitie.update(time, ctx, this.camera);
        }
    }

    updateOverlays(time, ctx) {
        for(let overlay of this.overlays){
            overlay.update(time, ctx, this.camera);
        }
    }

    update(time, ctx) {
        this.updateFighters(time, ctx);
        this.updateShadows(time,ctx);
        this.stage.update(time);
        this.updateEntities(time, ctx);
        this.camera.update(time);
        this.updateOverlays(time, ctx);
    }

    drawFighters(ctx) {
        for(let fighter of this.fighters){
            fighter.draw(ctx, this.camera);
        }
    }

    drawShadows(ctx) {
        for(let shadow of this.shadows){
            shadow.draw(ctx, this.camera);
        }
    }

    drawEntities(ctx) {
        for(let entitie of this.entities){
            entitie.draw(ctx, this.camera);
        }
    }

    drawOverlays(ctx) {
        for(let overlay of this.overlays){
            overlay.draw(ctx, this.camera);
        }
    }


    draw(ctx) {
        this.stage.draw(ctx, this.camera);
        this.drawShadows(ctx);
        this.drawFighters(ctx);
        this.drawEntities(ctx);
        this.drawOverlays(ctx);
    }
}