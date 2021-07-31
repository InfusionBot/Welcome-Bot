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
        const id = "848459799783669790";
        const userVotedDbl = await TopggAPI.hasVoted(message.author.id);
        let userVotedBls = async () => {
            const res = await this.fetchJson(
                `https://api.discordlist.space/v2/${id}/upvotes/status/${message.author.id}`,
                {
                    headers: {
                        Authorization: process.env.DISCORDLIST_token,
                        "User-Agent": process.env.userAgent,
                    },
                }
            );
            return res.voted;
        };
        userVotedBls = await userVotedBls();
        //console.log(userVotedBls);
        const voteDbl =
            t("cmds:vote.howToVote.dbl", {
                //link: `https://top.gg/bot/${this.client.user.id}/vote`,
                link: `https://top.gg/bot/${id}/vote`,
            }) + " 🎉";
        const voteBls =
            t("cmds:vote.howToVote.bls", {
                //link: `https://botlist.space/bot/${this.client.user.id}/upvote`,
                link: `https://discordlist.space/bot/${id}/upvote`,
            }) + " 🎉";
        const voteServer =
            t("cmds:vote.howToVoteServer", {
                link: `https://top.gg/servers/${this.client.config.botGuildId}/vote`,
            }) + " 🎉";
        const embed = new Embed({ color: "success", timestamp: true })
            .setTitle(t("cmds:vote.title"))
            .setDesc(
                `${
                    userVotedDbl
                        ? `~~${voteDbl}~~\n${t("cmds:vote.alreadyVoted")}`
                        : voteDbl
                }\n\n${
                    userVotedBls
                        ? `~~${voteBls}~~\n${t("cmds:vote.alreadyVoted")}`
                        : voteBls
                }\n\n${voteServer}\n\n${t("cmds:vote.rewards.index")}\n${t(
                    "cmds:vote.rewards.coins",
                    { coins: 500 }
                )}`
            );
        message.reply({ embeds: [embed] });
    }
};
