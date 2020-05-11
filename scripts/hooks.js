import { AoSActor } from "./aos-actor.js";
import { AoSActorSheet } from "./aos-actor-sheet.js";

Hooks.once("init", async function() {
    console.log(`Initializing Simple Age of Sigmar : Soulbound`);
    CONFIG.Combat.initiative = { formula: "1d6", decimals: 2 };
    CONFIG.Actor.entityClass = AoSActor;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("aos", AoSActorSheet, { types: ["character"], makeDefault: true });
    preloadHandlebarsTemplates()
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet.html"
    ];
    return loadTemplates(templatePaths);
}