export class AoSItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "item"],
            width: 350
        });
    }

    /** @override */
    get template() {
        let type = this.item.type;
        if (type == 'ally' || type == 'resource' || type == 'enemy' || type == 'rumour' || type == 'fear' || type == 'threat') {
            return `systems/age-of-sigmar-soulbound/templates/aos-item-sheet-list.html`;
        } else {
            return `systems/age-of-sigmar-soulbound/templates/aos-item-sheet-${type}.html`;
        }
    }

    /** @override */
    getData() {
        const data = super.getData();
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
    }
}
