/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { userFromMention } = require("../../helpers/Util.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor (client) {
        super({
            name: "avatar",
            aliases: ["dp", "profile"],
            memberPerms: [],
            botPerms: [],
            usage: "(@mention / user id)",
            disabled: false,
            cooldown: 10,
            category: "General",
        }, client);
    }

    execute ({message, args}, t) {
        const embed = new Embed();
        let user;
        if (args[0]) {
            user = userFromMention(args[0], message.client);
        } else {
            user = message.author;
        }
        if (!user) {
            return message.reply(t("errors:invalidUser"));
        }

        embed
            .setTitle(t("cmds:avatar.profile", { user: user.tag }))
            .setImage(user.displayAvatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    }
};
