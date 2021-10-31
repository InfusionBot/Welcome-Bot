/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { channelIdFromMention } = require("../../helpers/Util.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "snipe",
                aliases: [],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
                slash: true,
                options: [
                    {
                        name: "channel",
                        description: "The channel to snipe",
                        type: "CHANNEL",
                        required: false,
                    },
                ],
            },
            client
        );
    }

    execute({ message, args }, t) {
        let channel;
        if (args[0] && args[0].startsWith("<#")) {
            channel = channelIdFromMention(args[0]);
            channel = message.guild.channels.cache.get(channel) ?? {
                id: channel,
            };
        } else {
            // eslint-disable-next-line prefer-destructuring
            channel = message.channel;
        }
        const snipe = this.client.snipes.get(channel.id);
        if (!snipe) return message.channel.send(t("cmds:snipe.nothing"));
        const embed = new Embed()
            .setAuthor(snipe.author.tag)
            .setFooter(`#${channel.name}`)
            .setTimestamp(snipe.createdTimestamp);
        snipe.content ? embed.setDescription(snipe.content) : null;
        snipe.image ? embed.setImage(snipe.image) : null;
        message.channel.send({ embeds: [embed] });
    }

    async run({ interaction }, t) {
        const channel =
            interaction.options.getChannel("channel", false) ??
            interaction.channel;
        const snipe = this.client.snipes.get(channel.id);
        if (!snipe) return await interaction.followUp(t("cmds:snipe.nothing"));
        const embed = new Embed()
            .setAuthor(snipe.author.tag)
            .setFooter(`#${channel.name}`)
            .setTimestamp(snipe.createdTimestamp);
        snipe.content ? embed.setDescription(snipe.content) : null;
        snipe.image ? embed.setImage(snipe.image) : null;
        interaction.followUp({ embeds: [embed] });
    }
};
