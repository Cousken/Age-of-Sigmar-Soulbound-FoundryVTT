import {AoSActor} from "./aos-actor.js";
import {AoSActorSheet} from "./aos-actor-sheet.js";
import {AoSItemSheet} from "./aos-item-sheet.js";

Hooks.once("init", async function () {
    console.log(`Initializing Simple Age of Sigmar : Soulbound`);
    CONFIG.Combat.initiative = {formula: "1d6", decimals: 2};
    CONFIG.Actor.entityClass = AoSActor;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("aos", AoSActorSheet, {types: ["character"], makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("aos", AoSItemSheet, {
        types: ["weapon", "armour", "gear", "kharadron", "talent", "spell"],
        makeDefault: true
    });
    preloadHandlebarsTemplates()
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-armour.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-gear.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-kharadron.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-spell.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-talent.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-weapon.html"
    ];
    return loadTemplates(templatePaths);
}