/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "threadCreate",
    once: false,
    async execute(client, thread) {
        try {
            if (thread.joinable) await thread.join();
            const reply =
                "Sucessfully joined thread. This message will be deleted in";
            const msg = await thread.send(`${reply} 5 second(s)`);
            [5, 4, 3, 2, 1].forEach(async (sec) => {
                await client.wait(1000);
                msg.edit(`${reply} ${sec} second(s)`);
                if (1 == sec) {
                    await client.wait(1000);
                    msg.delete();
                }
            });
        } catch (e) {
            if (client.debug)
                client.logger.error(
                    `Can't join ${thread.name} thread, thread#joinable is ${thread.joinable}`
                );
        }
    },
};
