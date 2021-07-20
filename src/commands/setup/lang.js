/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const updateGuild = require("../../db/functions/guild/updateGuild");
const { lowercaseKeys, lowercaseVals } = require("../../helpers/Util.js");
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
        const keys = Object.keys(lowercaseKeys(list));
        const vals = Object.values(lowercaseVals(list));
        let str = "";
        for (const l in list) {
            str += `\`${l}\` - ${list[l]}\n`;
        }
        switch (args[0]) {
            case "set":
                if (!args[1]) {
                    return message.reply(t("cmds:lang.langNotProvided"));
                } else {
                    args[1] = args[1].toLowerCase();
                }
                if (!keys.includes(args[1]) && !vals.includes(args[1]))
                    return message.reply(
                        t("cmds:lang.invalid", {
                            cmd: `\`${guildDB.prefix}lang list\``,
                        })
                    );
                if (vals.includes(args[1])) {
                    args[1] = keys.find((key) => list[key] === args[1]);
                }
                updateGuild(message.guild.id, "lang", args[1]);
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
