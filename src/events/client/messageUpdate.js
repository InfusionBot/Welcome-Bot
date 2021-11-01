/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(client, oldMessage, message) {
        if (oldMessage.partial) return; // content is null
        client.editSnipes.set(oldMessage.channel.id, message);
        if (message.author.bot || !message.guild) return;
        let guildDB = await client.db.findOrCreateGuild(message.guild.id);
        if (!guildDB) {
            await client.wait(5000); //wait 5 secs
        }
        guildDB = await client.models.Guild.findOne({
            guildId: message.guild.id,
        });
        if (!guildDB) return;
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (
            message.channel.type === "GUILD_NEWS" &&
            guildDB.plugins.autopublish &&
            message.crosspostable
        )
            message.crosspost();
        if (
            message.guild &&
            guildDB.plugins.serverlogs.enabled &&
            oldMessage.content !== message.content
        ) {
            const channel = await message.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed({
                    tag: message.author.tag,
                    avatarURL: message.author.displayAvatarURL(),
                    footer: `ID: ${message.author.id}`,
                })
                    .setTitle(`${t("misc:edited")} - #${message.channel.name}`)
                    .setDesc(
                        `- ${oldMessage.content}\n` + `+ ${message.content}\n`
                    );
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
    },
};