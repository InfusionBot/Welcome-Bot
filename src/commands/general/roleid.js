/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { roleIdFromMention } = require("../../helpers/Util.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "roleid",
                aliases: ["role-id", "rid"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        const roleId = roleIdFromMention(args[0]);
        const role = await message.guild.roles.fetch(roleId);
        if (!role) return message.reply(t("errors:invalidRole"));
        message.channel.send(`${roleId}`);
    }
};
