/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const AsciiTable = require("ascii-table");
module.exports = async (client) => {
    const table = new AsciiTable();
    table.setHeading("Event", "Status");
    const eventsFolder = __dirname + "/events";
    let eventFiles;
    if (fs.existsSync(eventsFolder)) {
        eventFiles = fs.readdirSync(eventsFolder);
    } else {
        return client.logger.log(`Can't read ${eventsFolder}`);
    }
    eventFiles = eventFiles.filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${eventsFolder}/${file}`);
        try {
            if (event.once) {
                client.once(event.name, (...args) =>
                    event.execute(client, ...args)
                );
            } else {
                client.on(event.name, (...args) =>
                    event.execute(client, ...args)
                );
            }
            table.addRow(event.name, "✅");
        } catch (e) {
            client.logger.log(`Error occurred when loading ${event.name}`);
            console.error(e);
            table.addRow(event.name, "❌");
        }
    }
};
