/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = (client) => {
    const fs = require("fs");
    const { commands, categories } = client;
    let text = fs.readFileSync(__dirname + "/cmdTemplate.md", "utf8");
    text = text.replace("{commandsRoundToTen}", `${Math.floor(commands.size / 10)}0`).replace("{categoriesSize}", categories.length);
    let toc = "# Table of contents\n\n"; //Table of contents
    categories.forEach((cat) => {
        const cmds = commands
            .filter((cmd) => cmd.category === cat.name)
            .array();
        toc += `- [${cat.name}](#${cat.name.toLowerCase().replace(" ", "-")})\n`;
        text += `## ${cat.name} (${cmds.length} commands)\n\n`;
        cmds.forEach((cmd) => {
            let subcommands;
            if (cmd.subcommands) {
                subcommands = [];
                for (var i = 0; i < cmd.subcommands.length; i++) {
                    subcommands.push(
                        `\`${cmd.subcommands[i]}\` - ${cmd.subs_desc[i]}`
                    );
                }
            }
            text +=
                `### \`${cmd.name}\`\n\n` +
                `##### Subcommands:\n\n- ${
                    subcommands ? subcommands.join("\n- ") : "None"
                }\n\n##### Info\n\n` +
                `- Description: ${cmd.description}\n` +
                `- Usage: ${cmd.usage ? cmd.usage : "None"}\n` +
                `- Aliases: ${
                    cmd.aliases ? cmd.aliases.join(", ") : "None"
                }\n` +
                `- Cooldown: ${cmd.cooldown}\n\n`;
        });
    });
    fs.writeFileSync("./commands.md", `${toc}\n${text}`);
    client.logger.log("Docs updated!", "debug");
};
