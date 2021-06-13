/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "help",
    aliases: ["commands"],
    description: "List all of my commands or info about a specific command.",
    usage: "(command name)",
    cooldown: 5,
    category: "General",
    async execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        const getGuild = require("../../db/functions/guild/getGuild");
        const { commands } = message.client;
        const emojiList = ["⏪", "⏩"];
        let page = 0;
        let pages = [new MessageEmbed()];
        let timeout = 120000; //12 secs timeout

        pages[0].setTitle("Welcome Bot help");
        if (!args.length) {
            let p;
            message.client.categories.forEach((cat) => {
                p = pages.length;
                let commandsCat = [];
                let i = 1;
                pages[p] = new MessageEmbed();
                pages[p].setTitle(`Welcome Bot help - ${cat} Category`);
                message.client.commands.forEach((command) => {
                    if (command.category === cat)
                        commandsCat.push(`${i}. ${command.name}`);
                    i++;
                });
                pages[p].addField("Commands in this category:", commandsCat);
            });
            pages[0].setDescription(
                "List of all commands available in the bot"
            );
            pages[0].addField("No of Commands:", commands.size);
            pages[0].addField(
                "Get help for specific command:",
                `Send \`${guildDB.prefix}help [command name]\` to get info on a specific command!`
            );
            pages[0].addField(
                "What is Cooldown:",
                "Cooldown is the minimum time required to execute the same command again"
            );

            const curPage = await message.channel.send(
                pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)
            );
            for (const emoji of emojiList) await curPage.react(emoji);
            const reactionCollector = curPage.createReactionCollector(
                (reaction, user) =>
                    emojiList.includes(reaction.emoji.name) && !user.bot,
                { time: timeout }
            );
            reactionCollector.on("collect", (reaction) => {
                reaction.users.remove(message.author);
                switch (reaction.emoji.name) {
                    case emojiList[0]:
                        page = page > 0 ? --page : pages.length - 1;
                        break;
                    case emojiList[1]:
                        page = page + 1 < pages.length ? ++page : 0;
                        break;
                }
                curPage.edit(
                    pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)
                );
            });
            reactionCollector.on("end", () => {
                curPage.reactions.removeAll().catch(err => {
                    console.error(err);
                    if (err.message.search("Missing Permissions") !== -1)
                        message.channel.send("Looks like you didn't give bot ADD_REACTIONS permission.");
                });
                curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length} | Pagination timeout`))
            });
            return;
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.channel.send(
                `That is not a valid command or command was disabled, ${message.author}`
            );
        }

        pages[0].setDescription(`Help for ${command.name} command`);
        pages[0].addField("Command Name:", command.name);

        if (command.description)
            pages[0].addField("Description:", command.description);
        if (command.aliases && command.aliases !== [])
            pages[0].addField("Aliases: ", command.aliases.join(", "));
        if (command.permissions)
            pages[0].addField(
                "Permissions:",
                `You need ${command.permissions.join(
                    ", "
                )} permission(s) to execute this command.`
            );
        if (command.bot_perms)
            pages[0].addField(
                "Bot Permissions:",
                `The bot needs ${command.bot_perms.join(
                    ", "
                )} permission(s) to execute this command.`
            );
        if (command.subcommands)
            pages[0].addField("Subcommands:", command.subcommands.join(", "));
        if (command.usage)
            pages[0].addField(
                "Usage:",
                `\`\`\`\n${guildDB.prefix}${command.name} ${command.usage}\n\`\`\`` +
                    `\n[] = Required argument\n() = Optional argument\n|| = this OR that`
            );
        if (command.ownerOnly)
            pages[0].addField(
                "Can be executed by:",
                "Welcome-Bot owner **ONLY**"
            );

        pages[0].addField("Cooldown:", `${command.cooldown || 3} second(s)`);

        message.channel.send(pages[0]);
    },
};
