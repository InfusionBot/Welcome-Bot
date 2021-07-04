/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = async (client, dirPath = __dirname + "/../listeners") => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const Listeners = require(dirPath);
    const listeners = Object.values(Listeners).map(L => new L(client));
    console.log(dirPath);
    for (const listener in listeners) {
        listener.events.forEach(event => {
            try {
                client.on(event, listener[`on${capitalize(event)}`]);
                if (client.debug) client.logger.log(`${listener.name} listener loaded successfully.`);
            } catch (e) {
                client.logger.log(e.toString(), "error");
            }
        });
    }
    return true;
};
