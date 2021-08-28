/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "interactionCreate",
    once: false,
    execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const t = interaction.inGuild()
            ? await getT(interaction.guild.id)
            : client.i18next.getFixedT("en-US");
        if (!client.application?.owner) await client.application?.fetch();
        const { commandName: cmd } = interaction;
        let guildDB;
        if (interaction.inGuild() && interaction.channel.type !== "DM") {
            guildDB = await getGuild(interaction.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const userDB = await client.userDbFuncs.getUser(
            interaction.member.user.id
        );
        const command = client.commands.enabled.get(cmd);
        if (!command) return;
        let preCheck = false;
        preCheck = await command.preCheck(interaction, guildDB, t);
        if (!preCheck) return;
        command.run({ interaction, guildDB, userDB }, t).catch((err) => {
            client.logger.log(`Error when executing ${command.name}`, "error", [
                "CMDS",
            ]);
            console.log(err);
            const embed = new Embed({ color: "error" })
                .setTitle(t("errors:generic"))
                .addField(
                    `Please report this to ${client.ownersTags.join(" OR ")}`,
                    "\u200b"
                );
            if (
                client.config.ownerIds.includes(interaction.user.id) ||
                client.config.staffIds.includes(interaction.user.id) ||
                interaction.user.id === client.application?.owner.id
            )
                embed.addField("Error", `${err}`);
            interaction.followUp({ embeds: [embed], ephemeral: true });
        });
        if (client.debug)
            client.logger.log(`Executed ${command.name} command`, "debug");
    },
};
