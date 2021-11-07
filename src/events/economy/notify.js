/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    async execute(client, user, ctx) {
        let userDB = await client.models.User.findOne({ userId: user.id });
        if (!userDB) {
            userDB = await client.db.findOrCreateUser(user.id);
        }
        if (!userDB.settings.dmNotifications) return;
        try {
            await user.send(ctx);
        } catch (e) {
            userDB.settings.dmNotifications = false;
            await userDB.save();
        }
    },
};
