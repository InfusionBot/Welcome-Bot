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
    const economyEvents = `${eventsFolder}/economy`;
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
    if (fs.existsSync(economyEvents)) {
        eventFiles["economy"] = fs
            .readdirSync(economyEvents)
            .filter((file) => file.endsWith(".js"));
    } else {
        return client.logger.log(`Can't read ${economyEvents}`);
    }
    for (const i in eventFiles) {
        let error = true;
        for (const file of eventFiles[i]) {
            const event = require(`${eventsFolder}/${i}/${file}`);
            if (!event.name) {
                event.name = file.replace(".js", "");
            }
            if (!event.once) {
                event.once = false;
            }
            const selector =
                i === "economy"
                    ? client.economy
                    : i === "client"
                    ? client
                    : client.manager;
            try {
                if (event.once) {
                    selector.once(event.name, (...args) =>
                        event.execute(client, ...args)
                    );
                } else {
                    selector.on(event.name, (...args) =>
                        event.execute(client, ...args)
                    );
                }
                error = false;
            } catch (e) {
                client.logger.log(`Error occurred when loading ${event.name}`);
                console.error(e);
            }
        }
        if (error) {
            table.addRow(i, "❌");
        } else {
            table.addRow(i, "✅");
        }
    }
    console.log(`${table}`);
};
