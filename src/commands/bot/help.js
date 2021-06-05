/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    async execute(message, args) {
        const getGuild = require("../../db/functions/getGuild");
        let guildDB = await getGuild(message.guild.id);
        const data = [];
        let msg = new Discord.MessageEmbed();
        const { commands } = message.client;

        if (!args.length) {
            msg.setTitle("Bot help")
            msg.setDescription("List of all commands available in the bot");
            msg.addField("Commands: ", commands.map((command) => command.name).join(", "));
            msg.addField(
                "",
                `\nYou can send \`${guildDB.prefix}help [command name]\` to get info on a specific command!`
            );

            return message.channel.send(msg);
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply(
                "That is not a valid command or command was disabled!"
            );
        }

        data.push(`**Command Name:** ${command.name}`);

        if (command.aliases)
            data.push(`**Aliases:** ${command.aliases.join(", ")}`);
        if (command.permissions)
            data.push(
                `**Permissions:** You need ${command.permissions.join(
                    ", "
                )} permission(s) to execute this command.`
            );
        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.subcommands)
            data.push(`**Subcommands:** ${command.subcommands.join(", ")}`);
        if (command.usage)
            data.push(
                `**Usage:** ${guildDB.prefix}${command.name} ${command.usage}`
            );

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};
