export class AoSActorSheetParty extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "actor", "party"],
            template: "systems/age-of-sigmar-soulbound-enhanced/templates/aos-actor-sheet-party.html",
            width: 578,
            height: 600
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        this.computeActors(game.data);
        this.computeItems(data);
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.item-create').click(ev => this.onItemCreate(ev));
        html.find('.item-edit').click(ev => {
            const div = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(div.data("itemId"));
            item.sheet.render(true);
        });
        html.find('.item-delete').click(ev => {
            const div = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(div.data("itemId"));
            div.slideUp(200, () => this.render(false));
        });
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isAlly = item.type === 'ally';
            item.isResource = item.type === 'resource';
            item.isEnemy = item.type === 'enemy';
            item.isRumour = item.type === 'rumour';
            item.isFear = item.type === 'fear';
            item.isThreat = item.type === 'threat';
        }
    }

    computeActors(data) {
        for (let actor of Object.values(data.actors)) {
            actor.isCharacter = actor.type === 'character';
        }
    }

    onItemCreate(event) {
        event.preventDefault();
        let header = event.currentTarget;
        let data = duplicate(header.dataset);
        data["name"] = `New ${data.type.capitalize()}`;
        this.actor.createEmbeddedEntity("OwnedItem", data);
    }
}
