/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const updateGuild = require("../../db/functions/guild/updateGuild");
const { lowercaseArray } = require("../../helpers/Util.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "lang",
                aliases: ["language", "changelang", "getlang"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                usage: "(subcommand) (lang)",
                subcommands: [
                    { name: "list", desc: "List of all languages available" },
                    { name: "set", desc: "Set language" },
                ],
                disabled: false,
                cooldown: 10,
                category: "Setup",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const embed = new Embed({ color: "blue" });
        const list = require(`${__dirname}/../../locales/${guildDB.lang}/languages.json`);
        let str = "";
        for (const l in list) {
            str += `\`${l}\` - ${list[l]}\n`;
        }
        const language = this.client.languages.find(
            (l) =>
                l.name === args[1] ||
                l.aliases.includes(args[1]) ||
                l.aliases.includes(args[1].toLowerCase())
        )?.name;
        switch (args[0]) {
            case "set":
                if (!args[1]) {
                    return message.reply(t("cmds:lang.langNotProvided"));
                }
                if (!language)
                    return message.reply(
                        t("cmds:lang.invalid", {
                            cmd: `\`${guildDB.prefix}lang list\``,
                        })
                    );
                updateGuild(message.guild.id, "lang", language);
                return message.reply(
                    t("cmds:lang.success", {
                        lang: `${list[args[1]]} (${args[1]})`,
                    })
                );
                break;
            case "list":
                return message.reply({
                    embeds: [embed.setDesc(str)],
                });
                break;
            default:
                return message.reply({
                    embeds: [
                        embed.setDesc(
                            t("cmds:lang.show", { lang: guildDB.lang })
                        ),
                    ],
                });
                break;
        }
    }
};
