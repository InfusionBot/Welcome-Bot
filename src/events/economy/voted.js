/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    async execute(client, user, site, rawData) {
        let member;
        try {
            member = await client.guilds.cache
                .get(client.config.servers.main)
                .members.fetch(user.id);
        } catch (e) {
            member = null;
        }
        if (member)
            member.roles.add(client.config.roles.voters, `Voted on ${site}`);
        //TODO: remove the voters role in 12 hours
        let userDB = await client.models.User.findOne({ userId: user.id });
        if (!userDB) {
            userDB = await client.db.findOrCreateUser(user.id);
        }
        userDB.wallet = Number(userDB.wallet) + 10000; //Give 10k coins
        userDB.inventory.banknote = Number(userDB.inventory.banknote) + 3; //Give 3 banknotes
        await userDB.save();
        const t = client.i18next.getFixedT("en-US"); //currently only english support
        try {
            await user
                .send(t("misc:thanks.vote", { site, coins: "10,000" }))
                .catch((e) => {
                    throw e;
                });
        } catch (e) {
            //do nothing
        }
        let channel;
        try {
            channel = await client.channels.fetch(client.config.channels.votes);
        } catch (e) {
            channel = null;
            client.logger.error("Can't fetch vote log channel");
        }
        if (channel) {
            channel
                .send(
                    `⬆️ **${user.tag}** (\`${user.id}\`) voted for **${
                        client.username
                    }${
                        rawData?.guild ? " Community Server" : ""
                    }** on ${site} and got 10,000 WCoins with other rewards 🎉!`
                )
                .catch(console.log);
        }
    },
};
