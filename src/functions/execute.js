/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const updateGuild = require("../db/functions/updateGuild");
const getGuild = require("../db/functions/getGuild");

module.exports = async (message, client) => {
    let guildDB = await getGuild(message.guild.id);
    if (message.content.startsWith(guildDB.prefix)) {
        const args = message.content
            .slice(guildDB.prefix.length)
            .trim()
            .split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) return;

        if (command.guildOnly && message.channel.type === "dm") {
            return message.reply("I can't execute that command inside DMs!");
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply("You don't have permission to do this!");
            }
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error trying to execute that command!");
    }
};
