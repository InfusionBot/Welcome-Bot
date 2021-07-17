/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "listemojis",
                aliases: ["list-emojis"],
                memberPerms: [],
                //botPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                requirements: {
                    guildOnly: true,
                },
                usage: "(command name / category)",
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        if (message.channel.type !== "DM") {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms || !botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES))
                message
                    .reply(
                        `${t("errors:note")}: ${t(
                            "errors:iDontHavePermission",
                            {
                                permission: t("permissions:MANAGE_MESSAGES"),
                            }
                        )}, ${t("errors:pagination")}`
                    )
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 5000);
                    });
        }
        const emojiList = {
            first: "⏮",
            back: "⏪",
            forward: "⏩",
            last: "⏭",
            stop: "⏹",
        };
        let page = 0;
        let i0 = 0; //From
        let i1 = 10; //To
        let embed = new Embed({ color: "green", timestamp: true }).setTitle(
            t("cmds:listemojis.cmdDesc")
        );
        let timeout = 200000; //20 secs timeout
        const emojis = message.guild.emojis.cache.size;
        const getList = () => {
            return message.guild.emojis.cache
                .map((e, x) => `• ${e.name} (${x})`)
                .slice(i0, i1)
                .join("\n");
        };
        const curPage = await message.reply({
            embeds: [
                embed
                    .setDescription(`Emojis: ${emojis}\n\n${getList()}`)
                    .setFooter(`Page ${page + 1} / ${Math.ceil(emojis / 10)}`),
            ],
        });
        for (var key in emojiList) {
            await curPage.react(emojiList[key]);
        }
        const reactionCollector = curPage.createReactionCollector(
            (reaction, user) =>
                Object.values(emojiList).includes(reaction.emoji.name) &&
                user.id === message.author.id,
            { time: timeout }
        );
        reactionCollector.on("collect", (reaction) => {
            // Remove the reaction when the user react to the message
            reaction.users.remove(message.author);
            switch (reaction.emoji.name) {
                case emojiList["first"]:
                    i0 = 0;
                    i1 = 10;
                    page = 0;
                    break;
                case emojiList["last"]:
                    i0 = Math.floor(emojis / 10);
                    i1 = Math.floor(emojis / 10) + 10;
                    page = emojis;
                    break;
                case emojiList["back"]:
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;
                    break;
                case emojiList["forward"]:
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;
                    break;
                case emojiList["stop"]:
                    return curPage.delete();
                    break;
            }
            // If there is no emoji to display, delete the message
            if (i1 > emojis + 10) {
                return curPage.delete();
            }
            if (!i0 || !i1) {
                return curPage.delete();
            }
            curPage.edit({
                embeds: [
                    embed
                        .setDescription(`Emojis: ${emojis}\n\n${getList()}`)
                        .setFooter(
                            `Page ${page + 1} / ${Math.ceil(emojis / 10)}`
                        ),
                ],
            });
        });
        reactionCollector.on("end", () => {
            curPage.reactions.removeAll().catch((err) => {
                console.error(err);
            });
            curPage.edit({
                embeds: [
                    embed.setFooter(
                        `Page ${page + 1} / ${Math.ceil(
                            emojis / 10
                        )} | Pagination timed out`
                    ),
                ],
            });
        });
    }
};
