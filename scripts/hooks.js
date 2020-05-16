import {AoSActor} from "./aos-actor.js";
import {AosActorSheetCharacter} from "./aos-actor-sheet-character.js";
import {AoSActorSheetNpc} from "./aos-actor-sheet-npc.js";
import {AoSActorSheetParty} from "./aos-actor-sheet-party.js";
import {AoSItemSheet} from "./aos-item-sheet.js";

Hooks.once("init", async function () {
    CONFIG.Combat.initiative = {formula: "@initiative.value", decimals: 0};
    CONFIG.Actor.entityClass = AoSActor;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("aos", AosActorSheetCharacter, {types: ["character"], makeDefault: true});
    Actors.registerSheet("aos", AoSActorSheetNpc, {types: ["npc"], makeDefault: true});
    Actors.registerSheet("aos", AoSActorSheetParty, {types: ["party"], makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("aos", AoSItemSheet, {
        types: ["weapon", "armour", "gear", "kharadron", "talent", "spell", "trait", "attack", "ally", "resource", "enemy", "rumour", "fear", "threat"],
        makeDefault: true
    });
    preloadHandlebarsTemplates()
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet-character.html",
        "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet-npc.html",
        "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet-party.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-armour.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-gear.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-kharadron.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-spell.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-talent.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-weapon.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-trait.html",
        "systems/age-of-sigmar-soulbound/templates/aos-item-sheet-attack.html"
    ];
    return loadTemplates(templatePaths);
}