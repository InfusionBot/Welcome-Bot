/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const TopggAPI = require("../../classes/Topgg").api;
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "vote",
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Core",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        const id = "848459799783669790";
        const userVotedTopgg = await TopggAPI.hasVoted(message.author.id);
        let userVotedBls = await this.fetchJson(
            `https://api.discordlist.space/v2/bots/${id}/upvotes/status/${message.author.id}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORDLIST_token}`,
                    "User-Agent": process.env.userAgent,
                },
            }
        );
        userVotedBls = userVotedBls.upvoted;
        const embed = new Embed({ color: "success", timestamp: true })
            .setTitle(t("cmds:vote.title"))
            .setDesc(
                `${t("cmds:vote.rewards.index")}\n${t(
                    "cmds:vote.rewards.coins",
                    { coins: 5000 }
                )}\n${t("cmds:vote.rewards.banknote")}`
            );
        const buttonTopgg = new MessageButton()
            .setLabel("top.gg")
            .setURL(`https://top.gg/bot/${id}/vote`)
            .setStyle("LINK");
        if (userVotedTopgg) buttonTopgg.setDisabled(true);
        const buttonBls = new MessageButton()
            .setLabel("botlist.space")
            .setURL(`https://discordlist.space/bot/${id}/upvote`)
            .setStyle("LINK");
        if (userVotedBls) buttonBls.setDisabled(true);
        /*const buttonGuild = new MessageButton()
            .setLabel(`${this.client.username} ${t("misc:support")}`)
            .setURL(
                `https://top.gg/servers/${this.client.config.botGuildId}/vote`
            )
            .setStyle("LINK");*/
        const row = new MessageActionRow().addComponents(
            buttonTopgg,
            buttonBls
            //buttonGuild
        );
        message.reply({
            embeds: [embed],
            components: [row],
        });
    }
};
