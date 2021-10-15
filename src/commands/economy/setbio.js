/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const updateUser = require("../../db/functions/user/updateUser");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "setbio",
                aliases: ["bio"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        if (args.join(" ").length > 100) {
            return message.reply(t("errors:tooLong", { name: t("misc:bio") }));
        }
        try {
            await updateUser(message.author.id, "bio", args.join(" "));
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: "green" }).setDesc(
            t("cmds:setbio.success", { bio: args.join(" ") })
        );
        message.reply({ embeds: [embed] });
    }
};
