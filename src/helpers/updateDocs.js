/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = (client) => {
    const fs = require("fs");
    const table = require("markdown-table");
    const { commands, categories } = client;
    let text = `Welcome-Bot contains more than **${Math.floor(commands.size/10)}0 commands** in **${categories.length} categories**!\n\n#### Contents of the table\n**Name**: The name of the command  \n**Description**: A brief explanation of the purpose of the command  \n**Usage**: The arguments/options that the command takes in parameters  \n**Subcommands**: Subcommands to that command if availsble  \n**Aliases**: Duplicate names for this command which can be used.  \n**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n`;
    categories.forEach(cat => {
        const arrCat = [
            [ "Name", "Description", "Usage", "Subcommands", "Aliases", "Cooldown" ]
        ];
        const cmds = commands.filter(cmd => cmd.category === cat.name).array();
        text += `### ${cat.name} (${cmds.length} commands)`;
        cmds.forEach(cmd => {
            let subcommands;
            if (cmd.subcommands) {
                subcommands = [];
                for (var i = 0; i < cmd.subcommands.length; i++) {
                    subcommands.push(
                        `\`${cmd.subcommands[i]}\` - ${cmd.subs_desc[i]}`
                    );
                }
            }
            arrCat.push([
                `**${cmd.name}**`,
                `${cmd.description}`,
                `${cmd.usage?cmd.usage:"None"}`,
                `${subcommands?subcommands.join("\n"):"None"}`,
                `${cmd.aliases?cmd.aliases.join(", "):"None"}`,
                `${cmd.cooldown}`,
            ]);
        });
        text += `${table(arrCat)}\n\n`;
    });
    fs.writeFileSync("./commands.md", text);
    client.logger.log("Docs updated!", "debug");
};
