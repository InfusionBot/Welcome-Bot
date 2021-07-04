/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");

module.exports = {
    name: "reload",
    //description: "Reloads a command",
    args: true,
    usage: "[command]",
    cooldown: 30,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args, guildDB, t) {
        const commandName = args[0].toLowerCase();
        const command =
            message.client.commands.enabled.get(commandName) ||
            message.client.commands.enabled.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) {
            return message.channel.send(
                `There is no command with name or alias: \`${commandName}\`, ${message.author}!`
            );
        }

        const commandFolder = __dirname + "/../../commands";
        const commandFolders = fs.readdirSync(commandFolder);
        const folderName = commandFolders.find((folder) =>
            fs
                .readdirSync(`${commandFolder}/${folder}`)
                .includes(`${command.name}.js`)
        );

        delete require.cache[
            require.resolve(`${commandFolder}/${folderName}/${command.name}.js`)
        ];

        try {
            const newCommand = message.client.loadCommand(
                `${commandFolder}/${folderName}`,
                command.name
            );
            message.reply(`Command \`${newCommand.name}\` was reloaded!`);
        } catch (err) {
            message.client.logger.log(e.toString(), "err");
            message.reply(
                `There was an error while reloading a command \`${command.name}\``
            );
        }
    },
};
