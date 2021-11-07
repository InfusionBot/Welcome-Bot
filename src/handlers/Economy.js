/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { EventEmitter } = require("node:events");
const { Collection, MessageActionRow, MessageButton } = require("discord.js");
const { Embed } = require("../classes");
const { api: TopggAPI } = require("../classes/Topgg");
module.exports = class Economy extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.checks = {
            voted: {
                topgg: new Collection(),
                bls: new Collection(),
            },
        };
    }

    async checkVoted(user, t) {
        const { client } = this;
        const { botId: id } = client.config;
        const embed = new Embed({ color: "success" });
        const topgg = Boolean(await TopggAPI.hasVoted(user.id));
        let bls;
        try {
            bls = Boolean(
                await require("axios")
                    .get(
                        `https://api.discordlist.space/v2/bots/${id}/upvotes/status/${user.id}`,
                        {
                            headers: {
                                Authorization: `Bot ${process.env?.DISCORDLIST_token}`,
                                "User-Agent": process.env.userAgent,
                            },
                        }
                    )
                    .then((res) => res.data.upvoted)
            );
        } catch (e) {
            bls = true; //just skip the notification for bls because IDK IF HE VOTED
            console.log(e);
        }
        if (
            (this.checks.voted.topgg.get(user.id) &&
                this.checks.voted.bls.get(user.id)) ||
            (topgg && bls)
        )
            return;
        this.checks.voted.topgg.set(user.id, topgg);
        this.checks.voted.bls.set(user.id, bls);
        embed.setTitle(t("cmds:vote.youcan"));
        const buttonTopgg = new MessageButton()
            .setLabel("top.gg")
            .setURL(`https://top.gg/bot/${id}/vote`)
            .setStyle("LINK");
        if (topgg) buttonTopgg.setDisabled(true);
        const buttonBls = new MessageButton()
            .setLabel("botlist.space")
            .setURL(`https://discordlist.space/bot/${id}/upvote`)
            .setStyle("LINK");
        if (bls) buttonBls.setDisabled(true);
        const row = new MessageActionRow().addComponents(
            buttonTopgg,
            buttonBls
        );
        this.emit("notify", user, { embeds: [embed], components: [row] });
    }
};
