/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["commands", "cmd"],
    description: "List all of my commands or info about a specific command.",
    usage: "(command name / category)",
    //bot_perms: [Permissions.FLAGS.MANAGE_MESSAGES],
    cooldown: 5,
    category: "General",
    async execute(message, args, guildDB, t) {
        const { MessageEmbed } = require("discord.js");
        const beautifyPerms = require("../../functions/beautifyPerms");
        if (message.channel.type !== "dm" && !args.length) {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms || !botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES))
                message.reply(
                    `${t("errors:note")}: ${t("errors:iDontHavePermission", {
                        permission: t("permissions:MANAGE_MESSAGES"),
                    })}, ${t("errors:pagination")}`
                );
        }
        const commands = message.client.commands.enabled;
        const { categories } = message.client;
        const emojiList = {
            first: "⏮",
            back: "⏪",
            forward: "⏩",
            last: "⏭",
            stop: "⏹",
        };
        let page = 0;
        let pages = [new MessageEmbed()];
        let timeout = 200000; //20 secs timeout

        pages[0].setTitle(t("cmds:help.bot-help"));
        if (!args.length) {
            let p;
            categories.forEach((cat) => {
                p = pages.length;
                let commandsCat = [];
                pages[p] = new MessageEmbed();
                pages[p].setTitle(
                    `${t("cmds:help.bot-help")} - ${t(`categories:${cat.key}`)} Category`
                );
                message.client.commands.enabled.forEach((command) => {
                    if (command.category === cat.name)
                        commandsCat.push(
                            `- ${command.name} - ${t(
                                `cmds:${command.name}.cmdDesc`
                            )}`
                        );
                });
                pages[p].addField(
                    `${cat.emoji} ${t("cmds:help.in-cat")}`,
                    `\`\`\`\n${commandsCat.join(" • ")}\n\`\`\``
                );
            });
            pages[0].setDescription(
                "List of all commands available in the bot"
            );
            pages[0].addField("No of Commands:", `${commands.size}`);
            pages[0].addField(
                "No of categories:",
                `${categories.length}`
            );
            pages[0].addField(
                "Get help for specific command:",
                `Send \`${guildDB.prefix}help (command name)\` to get info on a specific command!`
            );
            pages[0].addField(
                "What is Cooldown:",
                "Cooldown is the time that must elapse between each command so that it can be executed again by the user"
            );
            pages[0].addField("Commands", `${t("cmds:help.cmds")}`);

            const curPage = await message.channel.send({
                embeds: [
                    pages[page].setFooter(`Page ${page + 1} / ${pages.length}`),
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
                    case emojiList["back"]:
                        page = page > 0 ? --page : pages.length - 1;
                        break;
                    case emojiList["forward"]:
                        page = page + 1 < pages.length ? ++page : 0;
                        break;
                    case emojiList["stop"]:
                        return curPage.delete();
                        break;
                    case emojiList["first"]:
                        page = 0;
                        break;
                    case emojiList["last"]:
                        page = pages.length - 1;
                        break;
                }
                curPage.edit({
                    embeds: [
                        pages[page].setFooter(
                            `Page ${page + 1} / ${pages.length}`
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
                        pages[page].setFooter(
                            `Page ${page + 1} / ${
                                pages.length
                            } | Pagination timed out`
                        ),
                    ],
                });
            });
            return;
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));
        const category = categories.find(c => c.name.toLowerCase() === name);

        if (!command && !category) {
            if (!command)
                return message.channel.send(
                    `${t("errors:commandNotFound")}, ${message.author}`
                );
            if (!category)
                return message.channel.send(
                    `${t("errors:categoryNotFound")}, ${message.author}`
                );
        }

        pages[0].setDescription(t(`cmds:help.cmdHelp`, { cmd: command.name }));
        pages[0].addField("Command Name:", command.name);

        let desc = t(`cmds:${command.name}.cmdDesc`);
        if (command.bot_perms) {
            desc += `\nThe bot needs ${beautifyPerms(
                command.bot_perms,
                message.client.allPerms,
                t
            ).join(", ")} permission(s) to execute this command.`;
        }
        pages[0].addField("Description:", desc);
        if (command.aliases)
            pages[0].addField("Aliases: ", command.aliases.join(", "));
        if (command.permissions)
            pages[0].addField(
                "Permissions:",
                `You need ${beautifyPerms(
                    command.permissions,
                    message.client.allPerms,
                    t
                ).join(", ")} permission(s) to execute this command.`
            );
        if (command.subcommands) {
            let subcommands = [];
            for (var i = 0; i < command.subcommands.length; i++) {
                subcommands.push(
                    `\`${command.subcommands[i].name}\` - ${command.subcommands[i].desc}`
                );
            }
            pages[0].addField("Subcommands:", subcommands.join(`\n`));
        }
        if (command.usage)
            pages[0].addField(
                "Usage:",
                `\`\`\`\n${guildDB.prefix}${command.name} ${command.usage}\n\`\`\`` +
                    `\n[] = Required argument\n() = Optional argument\n/ = Any One of these`
            );
        if (command.ownerOnly)
            pages[0].addField(
                "Can be executed by:",
                "Welcome-Bot developers **ONLY**"
            );

        pages[0].addField("Cooldown:", `${command.cooldown || 3} second(s)`);

        message.channel.send({ embeds: [pages[0]] });
    },
};
