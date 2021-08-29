/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "shardError",
    once: false,
    execute(client, error, shardId) {
        client.logger.error(
            `Shard ID: ${shardId} Error:\n${JSON.stringify(error, null, 4)}`,
            "error"
        );
    },
};
