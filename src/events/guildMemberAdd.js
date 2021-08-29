/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        // When a new member joins
        require("./functions/greetUser")(member);
        const guildDB = await client.guildDbFuncs.getGuild(member.guild.id);
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (guildDB.plugins.autorole.enabled) {
            member.roles
                .add(guildDB.plugins.autorole.role, "Autorole")
                .catch(() => {});
        }
    },
};
