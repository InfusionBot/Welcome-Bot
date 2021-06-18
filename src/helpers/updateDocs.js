/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = (client) => {
    const fs = require("fs");
    const { commands, categories } = client;
    let text = `Welcome-Bot contains more than **${Math.floor(
        commands.size / 10
    )}0 commands** in **${
        categories.length
    } categories**!\n\n#### Contents in a command\n**Subcommands**: Subcommands to that command if available  \n**Name**: The name of the command  \n**Description**: A brief explanation of the purpose of the command  \n**Usage**: The arguments/options that the command takes in parameters  \n**Aliases**: Duplicate names for this command which can be used.  \n**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n`;
    categories.forEach((cat) => {
        const cmds = commands
            .filter((cmd) => cmd.category === cat.name)
            .array();
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
    fs.writeFileSync("./commands.md", text);
    client.logger.log("Docs updated!", "debug");
};
