/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { codeBlock } = require("@discordjs/builders");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "botinfo",
                aliases: ["bi", "binfo", "info", "stats", "about"],
                memberPerms: [],
                botPerms: [],
                usage: "(--dm)",
                disabled: false,
                cooldown: 5,
                category: "Core",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        //Thanks to https://github.com/AnIdiotsGuide/guidebot/blob/master/commands/stats.js for some styling
        //TODO: Add translation
        if (args[0]) {
            args[0] = args[0].toLowerCase();
        }
        const promises = [
            this.client.shard.fetchClientValues("guilds.cache.size"),
            this.client.shard.broadcastEval((c) =>
                c.guilds.cache.reduce(
                    (acc, guild) => acc + guild.memberCount,
                    0
                )
            ),
        ];
        const duration = moment
            .duration(client.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]");
        const counts = await Promise.all(promises).then((results) => {
            const totalGuilds = results[0].reduce(
                (acc, guildCount) => acc + guildCount,
                0
            );
            const totalMembers = results[1].reduce(
                (acc, memberCount) => acc + memberCount,
                0
            );
            return { totalGuilds, totalMembers };
        });

        const system = codeBlock(
            "asciidoc",
            `= ${t("misc:system")} =
        • ${t("misc:ram_used")}   :: ${(
                process.memoryUsage().heapUsed /
                1024 /
                1024
            ).toFixed(2)} MB
        • Discord.js :: v${version}
        • Node       :: ${process.version}`
        );

        const general = codeBlock(
            "asciidoc",
            `= ${t("categories:general")} =
        • Uptime     :: ${duration}
        • Users      :: ${counts.totalMembers}
        • Servers    :: ${counts.totalGuilds}
        • Channels   :: ${this.client.channels.cache.size}
        • Commands   :: ${this.client.commands.enabled.size} commands
        • Version    :: ${message.client.package.version}`
        );

        const inline = true;
        const embed = new Embed({
            color: "success",
            timestamp: true,
            footer: t("cmds:botinfo.footer"),
        })
            .setTitle(
                `${message.client.user.username} v${message.client.package.version}`
            )
            .setDescription(`${this.client.application.description}`)
            .addField(`:pencil:`, general)
            .addField(`:gear:`, system);
        if (!args[0] || args[0] !== "--short") {
            embed
                .addField(
                    `${message.client.customEmojis.owner} Bot owners and staff`,
                    `**Welcome-Bot owners:** ${this.client.ownersTags.join(
                        ", "
                    )}\n**Welcome-Bot staff:** ${this.client.staffTags.join(
                        ", "
                    )}`
                )
                .addField(
                    "🧾 Bot lists:",
                    "> [discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/welcome-bot)\n" +
                        "> [disbotlist.xyz](https://disbotlist.xyz/bot/848459799783669790)\n" +
                        "> [dblist.xyz](https://dblist.xyz/bot/848459799783669790)\n" +
                        "> [discordservices.net](https://discordservices.net/bot/848459799783669790)\n" +
                        "> [discordlist.space](https://discordlist.space/bot/848459799783669790)\n" +
                        "> [discord.boats](https://discord.boats/bot/848459799783669790)\n" +
                        "> [top.gg](https://top.gg/bot/848459799783669790)\n",
                    inline
                );
        }
        embed
            .addField(
                "🔗 Useful links:",
                `> [Support server](${message.client.config.supportGuildInvite})\n` +
                    "> [GitHub](https://github.com/Welcome-Bot/welcome-bot/)\n" +
                    "> [Privacy policy](https://welcome-bot.github.io/docs/privacy-policy.html) and [Terms of service](https://welcome-bot.github.io/docs/terms.html)\n" +
                    "> [Documentation](https://welcome-bot.github.io/docs)",
                inline
            )
            .setImage(
                "https://welcome-bot.github.io/assets/img/graphics3-standard.gif"
            );
        switch (args[0]) {
            case "--dm":
                message.author.send({ embeds: [embed] });
                message.reply(`Check out your DMs, ${message.author}`);
                break;
            default:
                message.reply({ embeds: [embed] });
                break;
        }
    }
};
