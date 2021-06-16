const fs = require("fs");

module.exports = {
    name: "reload",
    description: "Reloads a command",
    args: true,
    usage: "[command]",
    cooldown: 30,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command =
            message.client.commands.get(commandName) ||
            message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) {
            return message.channel.send(
                `There is no command with name or alias \`${commandName}\`, ${message.author}!`
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
            message.reply(
                `Command \`${newCommand.name}\` was reloaded!`
            );
        } catch (error) {
            console.error(error);
            message.reply(
                `There was an error while reloading a command \`${command.name}\``
            );
        }
    },
};
