/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "usecode",
                aliases: ["use-code"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Core",
                slash: false,
            },
            client
        );
    }

    async execute({ message, args, guildDB, userDB }, t) {
        if (
            client.codes.getCode(guildDB?.premium?.code) ||
            client.codes.getCode(userDB?.premium?.code)
        ) {
            return message.reply(`${t(`cmds:usecode.errors.already`)}`);
        }
        const i = [message.author];
        if (message.guild) i.push(message.guild);
        const info = await this.client.codes.use(args[0], ...i);
        if (info.error)
            return message.reply(`${t(`cmds:usecode.errors.${info.error}`)}`);
        if (!message.guild) {
            userDB.premium.code = info.code;
            await userDB.save();
        } else {
            guildDB.premium.code = info.code;
            await guildDB.save();
        }
        message.react("✅");
    }

    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
