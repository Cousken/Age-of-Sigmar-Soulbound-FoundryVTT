export class AoSActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        console.log(`AoSActorSheet - defaultOptions`);
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "actor"],
            template: "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet.html",
            width: 578,
            height: 757,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        let middle = Object.values(data.data.skills).length / 2;
        let i = 0;
        for (let skill of Object.values(data.data.skills)) {
            skill.isLeft = i < middle;
            skill.isRight = i >= middle;
            i++;
        }
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
    }
}
