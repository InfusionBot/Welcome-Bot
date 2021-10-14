/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
// eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const fs = require("fs");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "reload",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    ownerOnly: true,
                },
                usage: "[command]",
                disabled: false,
                cooldown: 30,
                category: "Owner Only",
            },
            client
        );
    }

    execute({ message, args }) {
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
            message.client.logger.log(JSON.stringify(err, null, 4), "err");
            message.reply(
                `There was an error while reloading a command \`${command.name}\``
            );
        }
    }
};
