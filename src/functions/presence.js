/**
 * Discord Welcome bot
 * Copyright (c) 2021 The BaalKrshna Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const presence = function (client) {
    const servers = client.guilds.cache.size;
    console.log(`Updating presence. Servers: ${servers}`);
    client.user
        .setPresence({
            activity: {
                name: `${servers} server${servers > 1 ? "s" : ""}`,
                type: "WATCHING",
            },
        })
        .catch((error) => console.error(error));
};
module.exports = presence;
