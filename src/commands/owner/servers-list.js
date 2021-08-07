/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "servers-list",
                aliases: ["slist"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 20,
                category: "Owner Only",
            },
            client
        );
    }

    async execute({ message, args, guildDB }) {
        const servers = message.client.guilds.cache.size;
        const emojiList = {
            back: "⏪",
            forward: "⏩",
            stop: "⏹",
        };
        let page = 0;
        let i0 = 0;
        let i1 = 10;
        const timeout = 200000; //20 secs timeout
        const getList = () => {
            return message.client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(
                    (r, i) =>
                        `**${i + 1}** - ${r.name} | ${r.memberCount} members`
                )
                .slice(i0, i1)
                .join("\n");
        };
        const embed = new Embed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({
                    size: 512,
                    dynamic: true,
                    format: "png",
                })
            )
            .setTitle(`Page: ${page + 1} / ${Math.ceil(servers / 10)}`)
            .setDescription(`Servers: ${servers}\n\n` + getList());
        const curPage = await message.channel.send({ embeds: [embed] });
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
            // If there is no guild to display, delete the message
            if (i1 > servers + 10) {
                return curPage.delete();
            }
            if (!i0 || !i1) {
                return curPage.delete();
            }
            curPage.edit({
                embeds: [
                    embed
                        .setDescription(`Servers: ${servers}\n\n${getList()}`)
                        .setTitle(
                            `Page ${page + 1} / ${Math.ceil(servers / 10)}`
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
                            servers / 10
                        )} | Pagination timed out`
                    ),
                ],
            });
        });
    }
};
