/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "inviteDelete",
    once: false,
    execute(/*client, invite*/) {
        /*if (
            !client.invites.get(invite.guild.id) &&
            invite.guild.me.permissions.has("MANAGE_GUILD")
        ) {
            //without manage guild we can't fetch invites :(
            invite.guild.invites
                .fetch()
                .then((guildInvites) => {
                    client.invites.set(
                        invite.guild.id,
                        new Map(guildInvites.map((inv) => inv.uses))
                    );
                })
                .catch(() => {});
        }
        client.invites.get(invite.guild.id).delete(invite.code);*/
    },
};
