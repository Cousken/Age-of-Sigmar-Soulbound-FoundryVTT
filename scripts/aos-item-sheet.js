export class AoSItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        console.log(`AoSItemSheet - defaultOptions`);
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "item"],
            width: 350,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    get template() {
        let type = this.item.type;
        return `systems/age-of-sigmar-soulbound/templates/aos-item-sheet-${type}.html`;
    }

    /** @override */
    getData() {
        const data = super.getData();
        console.log(data);
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
    }
}
