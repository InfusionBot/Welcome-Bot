/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    async execute(client, user, site, rawData) {
        let member, guild;
        try {
            guild = await client.util.getGuild(client.config.servers.main);
            member = await guild.members.fetch(user.id);
        } catch (e) {
            member = null;
        }
        if (member) {
            member.roles.add(client.config.roles.voters, `Voted on ${site}`);
        }
        //TODO: remove the voters role in 12 hours
        let userDB = await client.models.User.findOne({ userId: user.id });
        if (!userDB) {
            userDB = await client.db.findOrCreateUser(user.id);
        }
        const coins = 10000;
        userDB.wallet = Number(userDB.wallet) + coins; //Give 10k coins
        userDB.inventory.banknote = Number(userDB.inventory.banknote) + 3; //Give 3 banknotes
        await userDB.save();
        const t = client.i18next.getFixedT("en-US"); //currently only english support
        try {
            await user
                .send(
                    t("misc:thanks.vote", {
                        site,
                        coins: coins.toLocaleString(
                            userDB.locale === "null" ? "en-US" : userDB.locale
                        ),
                    })
                )
                .catch((e) => {
                    throw e;
                });
        } catch (e) {
            //do nothing
        }
        let channel;
        try {
            channel = await guild.channels.fetch(client.config.channels.votes);
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
                    }** on ${site} and got ${coins.toLocaleString(
                        "en-US"
                    )} WCoins with other rewards 🎉!`
                )
                .catch(console.log);
        }
    },
};
