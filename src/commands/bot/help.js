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
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const getGuild = require("../../db/functions/getGuild");
        let guildDB;
        if (message.channel.type !== "dm")
            guildDB = await getGuild(message.guild.id);
        else guildDB = { prefix: "w/" };
        let msg = new MessageEmbed();
        const { commands } = message.client;

        msg.setTitle("Welcome Bot help");
        if (!args.length) {
            msg.setDescription("List of all commands available in the bot");
            msg.addField(
                "Commands:",
                commands.map((command) => command.name).join(", ")
            );
            msg.addField(
                "Get help for specific command:",
                `Send \`${guildDB.prefix}help [command name]\` to get info on a specific command!`
            );
            msg.addField(
                "What is Cooldown:",
                "Cooldown is the minimum time required to execute the same command again"
            );

            return message.channel.send(msg);
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

        msg.setDescription(`Help for ${command.name} command`);
        msg.addField("Command Name:", command.name);

        if (command.description)
            msg.addField("Description:", command.description);
        if (command.aliases && command.aliases !== [])
            msg.addField("Aliases: ", command.aliases.join(", "));
        if (command.permissions)
            msg.addField(
                "Permissions:",
                `You need ${command.permissions.join(
                    ", "
                )} permission(s) to execute this command.`
            );
        if (command.bot_perms)
            msg.addField(
                "Bot Permissions:",
                `The bot needs ${command.bot_perms.join(
                    ", "
                )} permission(s) to execute this command.`
            );
        if (command.subcommands)
            msg.addField("Subcommands:", command.subcommands.join(", "));
        if (command.usage)
            msg.addField(
                "Usage:",
                `\`\`\`\n${guildDB.prefix}${command.name} ${command.usage}\n\`\`\`` +
                    `\n[] = Required argument\n() = Optional argument\n|| = this OR that`
            );
        if (command.ownerOnly)
            msg.addField("Can be executed by:", "Welcome-Bot owner **ONLY**");

        msg.addField("Cooldown:", `${command.cooldown || 3} second(s)`);

        message.channel.send(msg);
    },
};
