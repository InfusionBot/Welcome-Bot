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
        const getGuild = require("../db/functions/getGuild");
        let guildDB = await getGuild(message);
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push("List of all commands available in the bot:");
            data.push(commands.map((command) => command.name).join(", "));
            data.push(
                `\nYou can send \`${guildDB.prefix}help [command name]\` to get info on a specific command!`
            );

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("That is not a valid command!");
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases)
            data.push(`**Aliases:** ${command.aliases.join(", ")}`);
        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.usage)
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};
