export class AoSActorSheetNpc extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "actor"],
            template: "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet-npc.html",
            width: 578,
            height: 780
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        this.computeItems(data);
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.button-roll').click(event => {
            let dice = html.find('#dice').val();
            let difficulty = html.find('#difficulty').val();
            let complexity = html.find('#complexity').val();
            event.preventDefault();
            this.roll(dice, difficulty, complexity);
        });
        html.find('.toughness-max').change(event => {
            this.actor.data.data["combat-abilities"].toughness.value = event.target.value;
        });
        html.find('.wounds-max').change(event => {
            this.actor.data.data["wounds"].value = event.target.value;
        });
        html.find('.mettle-max').change(event => {
            this.actor.data.data["combat-abilities"].mettle.value = event.target.value;
        });
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


    roll(dice, difficulty, complexity) {
        let r = new Roll("(@dice)d6cs>=(@difficulty)", {dice: dice, difficulty: difficulty});
        r.roll();
        let rolls = ""
        let separator = "";
        r.parts[0].rolls.sort(function(a, b){return b.roll-a.roll}).forEach(res => {
            if (rolls === "") {
                separator = "";
            } else {
                separator = ", ";
            }
            if (res.success) {
                rolls = rolls + separator + "<span style='color:green'>" + res.roll + "</span>";
            } else {
                rolls = rolls + separator + "<span style='color:red'>" +  res.roll + "</span>";
            }
        });
        let header = "<b style='float:right'>DN " + difficulty + ":" + complexity + "</b>";
        let rollResult = "[" + rolls + "]";
        let body;
        if (r.total >= complexity) {
            body = "<b style='color:green'>SUCCEED</b> with " + (r.total - complexity) + " degrees</br>"
        } else {
            body = "<b style='color:red'>FAILED</b> with " + (r.total - complexity) + " degrees</br>"
        }
        let chatContent = header + body + rollResult;
        let chatData = {
            user: game.user._id,
            content: chatContent
        };
        ChatMessage.create(chatData, {});
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isTrait = item.type === 'trait';
            item.isAttack = item.type === 'attack';
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
