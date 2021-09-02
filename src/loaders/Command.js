/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const AsciiTable = require("ascii-table");
module.exports = async (client) => {
    // Create a new Ascii table
    const table = new AsciiTable();
    table.setHeading("Category", "Status");
    client.commands = {
        enabled: new Collection(),
        disabled: new Collection(),
        cooldowns: new Collection(),
    };
    const commandFolder = __dirname + "/../commands";
    let commandFolders;
    if (fs.existsSync(commandFolder)) {
        commandFolders = fs.readdirSync(commandFolder);
    } else {
        return client.logger.log(`Can't read ${commandFolder}`);
    }

    for (const folder of commandFolders) {
        /*const commandFiles = fs
            .readdirSync(`${commandFolder}/${folder}`)
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            try {
                client.loadCommand(`${commandFolder}/${folder}`, file);
            } catch (e) {
                client.logger.log(`Error occurred when loading ${file}`);
                console.error(e);
            }
        }*/
        let error = false;
        const { commands, metadata } = require(`${commandFolder}/${folder}`);
        for (const cmd of commands) {
            try {
                client.setCmd(cmd);
            } catch (e) {
                client.logger.log(`Error occurred when loading ${cmd.name}`);
                console.error(e);
                error = true;
            }
        }
        if (!error) table.addRow(metadata.name, "✅");
        else table.addRow(metadata.name, "❌");
        if (metadata.name.indexOf("Owner") === -1)
            client.categories.push(metadata);
    }
    console.log(`${table}`);
};
