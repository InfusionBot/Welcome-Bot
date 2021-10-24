/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "voiceStateUpdate",
    once: false,
    async execute(client, oldState, newState) {
        let guildDB = await client.db.findOrCreateGuild(newState.guild.id);
        if (!guildDB) {
            await client.wait(5000); //wait 5 secs
        }
        guildDB = await client.models.Guild.findOne({
            guildId: newState.guild.id,
        });
        if (!guildDB) return;
        const { member } = oldState;
        let joined, joinedChannel, leftChannel;
        if (oldState.channelId && !newState.channelId) {
            joined = false;
            // eslint-disable-next-line prefer-destructuring
            leftChannel = oldState.channel;
        } else if (!oldState.channelId && newState.channelId) {
            joined = true;
            // eslint-disable-next-line prefer-destructuring
            joinedChannel = newState.channel;
        }
        const t = client.i18next.getFixedT(guildDB.lang ?? "en-US");
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await newState.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel && (joinedChannel || leftChannel)) {
                const embed = new Embed({
                    tag: member.user.tag,
                    avatarURL: member.user.displayAvatarURL(),
                    footer: `ID: ${member.user.id}`,
                })
                    .setTitle(
                        `${
                            joined ? t("misc:voice_join") : t("misc:voice_left")
                        }`
                    )
                    .setDesc(
                        `${joined ? "+" : "-"} ${
                            joined ? joinedChannel : leftChannel
                        }`
                    );
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
        //For music
        if (oldState.channelId && !newState.channelId) {
            if (oldState.member && oldState.member.user.id === client.user.id) {
                //in case, someone kicked the bot, and the player is still alive, then destroy the player
                const player = client.manager.players.get(oldState.guild.id);
                if (!player) return;
                return client.manager.emit("queueEnd", player);
            }
            const player = client.manager.players.get(oldState.guild.id);
            if (!player) return;
            if (oldState?.channel) {
                //If a this member was in the channel before (not sure if now also), then ...
                if (!oldState.guild.me.voice.channel) {
                    //if me (bot) was not in a channel before, then destroy
                    return player.destroy();
                }
                if (
                    player &&
                    oldState.guild.channels.cache.get(player.voiceChannel)
                        .members.size <= 1
                ) {
                    //If player is alive, there is only 1 member left and it is not running for 24/7, then emit queueEnd
                    if (!player.get("247"))
                        return client.manager.emit("queueEnd", player);
                }
            }
        }
    },
};
