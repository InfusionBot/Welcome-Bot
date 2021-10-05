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
                name: "ping",
                aliases: ["latency", "pong"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 5,
                category: "Core",
                slash: true,
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message }, t) {
        const msg = `${t("misc:pong")} ${message.author}\n${t(
            "misc:webheart"
        )}: ${message.client.ws.ping}ms.\n`;
        message.reply(msg + `Getting roundtrip latency`).then((sent) => {
            sent.edit(
                msg +
                    `${t("misc:latency")}: ${
                        sent.createdTimestamp - message.createdTimestamp
                    }ms`
            );
        });
    }

    //eslint-disable-next-line no-unused-vars
    async run({ interaction }, t) {
        const msg = `${t("misc:pong")} ${interaction.member.user}\n${t(
            "misc:webheart"
        )}: ${interaction.client.ws.ping}ms.\n`;
        const sent = await interaction.editReply(
            msg + `Getting roundtrip latency`
        );
        sent.edit(
            msg +
                `${t("misc:latency")}: ${
                    sent.createdTimestamp - interaction.createdTimestamp
                }ms`
        );
    }
};
