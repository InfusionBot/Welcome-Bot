/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "vote",
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Core",
            },
            client
        );
    }

    execute({ message, args, guildDB, userDB }, t) {
        const embed = new Embed({color: "success", timestamp: true})
            .setTitle(t("cmds:vote.cmdDesc"))
            .setDesc(t("cmds:vote.howToVote", {link: `https://top.gg/bot/${this.client.user.id}/vote`}));
        message.reply({embeds: [embed]});
    }
};
