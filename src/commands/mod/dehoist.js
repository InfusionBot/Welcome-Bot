/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { escapeRegex } = require("../../helpers/Util");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "dehoist",
                aliases: ["deh"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                    guildOnly: true,
                },
                subcommands: [
                    {
                        name: "list",
                        desc: "List all members who are hoisting",
                    },
                ],
                disabled: false,
                cooldown: 5,
                category: "Moderation",
                slash: false,
            },
            client
        );
    }

    async execute({ message, args }, t) {
        //const newnick = `${args[0] ?? "No hoisting"}`;
        const hoistedMembers = [];
        const members = await message.guild.members.fetch({ force: true });
        const hoistingPattern = /\W/g;
        const newNick = (currentNick) => {
            const hoistChar = currentNick
                .trim()
                .charAt(0)
                .match(hoistingPattern)?.[0];
            if (!hoistChar) return currentNick;
            const regexp = new RegExp(`^${escapeRegex(hoistChar)}\\s`);
            const newNick = currentNick.replace(regexp, "");
            //console.log(newNick);
            return newNick;
        };
        members.each((m) => {
            const nickOrName = m.nickname ?? m.user.username;
            const newnick = newNick(nickOrName);
            if (newnick === nickOrName) return;
            hoistedMembers.push(nickOrName);
        });
        if (!args[0] || args[0] !== "list") {
            members.each(async (m) => {
                const nickOrName = m.nickname ?? m.user.username;
                const newnick = newNick(nickOrName);
                if (newnick === nickOrName) return;
                try {
                    await m.setNickname(
                        newnick,
                        `dehoisting by ${message.author.tag}`
                    );
                } catch (e) {
                    if (this.client.debug) console.log(e);
                }
            });
            message.react("✅");
        } else {
            const embed = new Embed()
                .setTitle(t("cmds:dehoist.cmdDesc"))
                .setDesc(hoistedMembers.join(", "));
            message.channel.send({ embeds: [embed] });
        }
    }
};
