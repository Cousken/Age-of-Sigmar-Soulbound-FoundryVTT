export class AosActorSheetCharacter extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["age-of-sigmar", "sheet", "actor"],
            template: "systems/age-of-sigmar-soulbound/templates/aos-actor-sheet-character.html",
            width: 578,
            height: 757,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        this.computeSkills(data);
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

    computeSkills(data) {
        let middle = Object.values(data.data.skills).length / 2;
        let i = 0;
        for (let skill of Object.values(data.data.skills)) {
            skill.isLeft = i < middle;
            skill.isRight = i >= middle;
            i++;
        }
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isWeapon = item.type === 'weapon';
            item.isSpell = item.type === 'spell';
            item.isTalent = item.type === 'talent';
            item.isArmour = item.type === 'armour';
            item.isGear = item.type === 'weapon' || item.type === 'gear' || item.type === 'armour' || item.type === 'kharadron';
            if (item.isWeapon) {
                let attributes = Object.values(data.data.attributes);
                let skills = Object.values(data.data.skills);
                if (item.data.category === 'accuracy') {
                    item.dicePool = attributes[0].value + skills[3].training;
                    item.focus = skills[3].focus;
                } else {
                    item.dicePool = attributes[0].value + skills[23].training;
                    item.focus = skills[23].focus;
                }
            }
        }
    }
}
