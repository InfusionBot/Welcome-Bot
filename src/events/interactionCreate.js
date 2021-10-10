/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if (!client.application?.owner) await client.application?.fetch();
        const { commandName: cmd } = interaction;
        await interaction.deferReply();
        let guildDB;
        if (interaction.inGuild() && interaction.channel.type !== "DM") {
            guildDB = await client.db.guildSchema.findOne({
                guildId: interaction.guild.id,
            });
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const t = client.i18next.getFixedT(guildDB.lang ?? "en-US");
        const userDB = await client.db.userSchema.findOne({
            userId: interaction.member.user.id,
        });
        const command = client.commands.enabled
            .filter((cmd) => cmd.slash)
            .get(cmd);
        if (!command) return console.log(`${cmd} slash command not found`);
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
