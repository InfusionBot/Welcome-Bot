/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = (client) => {
    const fs = require("fs");
    const { categories } = client;
    const commands = client.commands.enabled;
    let text = fs.readFileSync(__dirname + "/cmdTemplate.md", "utf8");
    let toc = "# Table of contents\n\n"; //Table of contents
    const t = client.i18next.getFixedT("en-US");
    categories.forEach((cat) => {
        let cmds = commands.filter((cmd) => cmd.category === cat.name);
        cmds = [...cmds.values()];
        toc += `- [${cat.name}](#${cat.name
            .toLowerCase()
            .replace(" ", "-")})\n`;
        text += `\n## ${cat.name} (${cmds.length} commands)\n`;
        cmds.forEach((cmd) => {
            let subcommands;
            if (cmd.subcommands) {
                subcommands = [];
                for (var i = 0; i < cmd.subcommands.length; i++) {
                    subcommands.push(
                        `\`${cmd.subcommands[i].name}\` - ${cmd.subcommands[i].desc}`
                    );
                }
            }
            let aliases = "None";
            if (cmd.aliases?.length !== undefined) {
                aliases = `\`${cmd.aliases.join("`, `")}\``;
            }
            text +=
                `\n### \`${cmd.name}\`\n\n` +
                `##### Subcommands:\n\n- ${
                    subcommands ? subcommands.join("\n- ") : "None"
                }\n\n##### Cmd info\n\n` +
                `- Description: ${t(`cmds:${cmd.name}.cmdDesc`)}\n` +
                `- Usage: ${client.config.defaultPrefix}${cmd.name} ${cmd.defaultUsage}\n` +
                `- Aliases: ${aliases}\n` +
                `- Cooldown: ${cmd.cooldown}\n`;
        });
    });
    text = text
        .replace("{commandsRoundToTen}", `${Math.floor(commands.size / 10)}0`)
        .replace("{categoriesSize}", categories.length)
        .replace("{toc}", toc);
    fs.writeFileSync("./commands.md", `${text}`);
    if (client.debug) client.logger.log("Docs updated!", "debug");
};
