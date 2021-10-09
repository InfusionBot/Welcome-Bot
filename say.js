const Command = require("bot.j");

class Write extends Command {
    
    constructor(Bot) {

        super(Bot, {
            enabled: true, 
            required_perm: "MANAGE_MESSAGES", 
            usages: ["write"], 
            description: "Write something with bot.", 
            category: "General", 
            options: [{
                name: "text",
                description: "write a text.",
                type: 3, 
                required: true
            }] 
        });

    }

    load() {
           
        return;

    }

    async run(interaction, guild, member, args) {

        return await this.Bot.send(interaction, args[0].value);

    }

}

module.exports = Write;
