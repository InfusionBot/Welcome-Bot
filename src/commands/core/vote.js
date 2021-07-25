/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const TopggAPI = require("../../classes/Topgg").api;
const { Embed, Command } = require("../../classes");
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

    async execute({ message, args, guildDB, userDB }, t) {
        const userHasVoted = await TopggAPI.hasVoted(message.author.id);
        const howToVote = t("cmds:vote.howToVote", {
            //link: `https://top.gg/bot/${this.client.user.id}/vote`,
            link: `https://top.gg/bot/848459799783669790/vote`,
        }) + " 🎉";
        const howToVoteServer = t("cmds:vote.howToVoteServer", {
            link: `https://top.gg/servers/${this.client.config.botGuildId}/vote`,
        }) + " 🎉";
        const embed = new Embed({ color: "success", timestamp: true })
            .setTitle(t("cmds:vote.cmdDesc"))
            .setDesc(
                `${userHasVoted
                    ? `~~${howToVote}~~\n${t("cmds:vote.alreadyVoted")}`
                    : howToVote}${howToVoteServer}`
            );
        message.reply({ embeds: [embed] });
    }
};
