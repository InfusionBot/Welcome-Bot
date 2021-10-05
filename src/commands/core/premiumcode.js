/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const moment = require("moment");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "premiumcode",
                aliases: [],
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

    async execute({ message, args, guildDB, userDB, language }, t) {
        moment.locale(language.moment);
        const info = await this.client.codes.getCode(args[0]);
        if (!info) return message.reply(`${t(`cmds:usecode.errors.invalid`)}`);
        const embed = new Embed()
            .setTitle(
                `${t("cmds:premiumcode.embed.title", { code: info.code })}`
            )
            .setDesc(`${t("cmds:premiumcode.embed.desc", { code: info.code })}`)
            .addField(
                `${t("cmds:premiumcode.expires")}`,
                `${moment(info.expiresAt).humanize()}`
            );
        message.channel.send({ embeds: [embed] });
    }

    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
