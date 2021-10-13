/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const AsciiTable = require("ascii-table");
const fs = require("fs");
module.exports = (client) => {
    const table = new AsciiTable();
    table.setHeading("Event", "Status");
    const eventsFolder = `${__dirname}/../events`;
    const clientEvents = `${eventsFolder}/client`;
    const lavalinkEvents = `${eventsFolder}/lavalink`;
    const eventFiles = {};
    if (fs.existsSync(clientEvents)) {
        eventFiles["client"] = fs
            .readdirSync(clientEvents)
            .filter((file) => file.endsWith(".js"));
    } else {
        return client.logger.log(`Can't read ${clientEvents}`);
    }
    if (fs.existsSync(lavalinkEvents)) {
        eventFiles["lavalink"] = fs
            .readdirSync(lavalinkEvents)
            .filter((file) => file.endsWith(".js"));
    } else {
        return client.logger.log(`Can't read ${lavalinkEvents}`);
    }
    for (const i in eventFiles) {
        for (const file of eventFiles[i]) {
            const event = require(`${eventsFolder}/${i}/${file}`);
            try {
                if (event.once) {
                    (i === "client" ? client : client.manager).once(
                        event.name,
                        (...args) => event.execute(client, ...args)
                    );
                } else {
                    (i === "client" ? client : client.manager).on(
                        event.name,
                        (...args) => event.execute(client, ...args)
                    );
                }
                table.addRow(event.name, "✅");
            } catch (e) {
                client.logger.log(`Error occurred when loading ${event.name}`);
                console.error(e);
                table.addRow(event.name, "❌");
            }
        }
    }
    console.log(`${table}`);
};
