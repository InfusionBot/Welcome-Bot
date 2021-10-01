/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const beautifyPerms = require("../../functions/beautifyPerms");
const { Embed, Command } = require("../../classes");
const { Pagination } = require("djs-pagination-buttons");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "help",
                aliases: ["commands", "cmds", "ajuda"], //ajuda means help in portuguese
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const commands = this.client.commands.enabled;
        const { categories } = this.client;
        const pages = [new Embed({ color: "blue", timestamp: true })];
        const timeout = 200000; //20 secs timeout

        for (let i = 0; i < pages.length; i++) {
            pages[i].setTitle(t("cmds:help.bot-help"));
        }
        if (!args.length) {
            categories.forEach((cat) => {
                const p = pages.length;
                const commandsCat = [];
                pages[p] = new Embed({
                    color: "blue",
                    timestamp: true,
                }).setTitle(
                    `${t("cmds:help.bot-help")} - ${t(
                        `categories:${cat.key}`
                    )} ${t("misc:category")}`
                );
                commands.forEach((command) => {
                    if (command.category === cat.name)
                        commandsCat.push(
                            `• ${command.name} - ${t(
                                `cmds:${command.name}.cmdDesc`
                            )}`
                        );
                });
                pages[p].addField(
                    `${cat.emoji} ${t("cmds:help.in_cat")}`,
                    `\`\`\`\n${commandsCat.join("\n")}\n\`\`\``
                );
            });
            pages[0].setDescription(t("cmds:help.all"));
            pages[0].addField("No. of Commands", `${commands.size}`);
            pages[0].addField("No. of categories", `${categories.length}`);
            pages[0].addField(
                "Get help for specific command:",
                `Send \`${guildDB.prefix}help (command name)\` to get info on a specific command!`
            );
            pages[0].addField(
                "Commands",
                `${t("cmds:help.cmds", { prefix: guildDB.prefix })}`
            );
            const pagination = new Pagination(this.client, {
                buttons: {
                    page: `${t("misc:page")} {{page}} / {{total_pages}}`,
                },
                timeout: timeout,
            });
            pagination.setPages(pages);
            pagination.setAuthorizedUsers([message.author.id]);
            pagination.send(message.channel);
            return;
        } else if (args[0] && args[0] === "--list-categories") {
            const cats = [];
            categories.forEach((cat) => {
                cats.push(`${t(`categories:${cat.key}`)}`);
            });
            return message.reply({
                embeds: [
                    pages[0].setDesc(
                        `${t("cmds:help.listcats")}\`\`\`\n• ${cats.join(
                            "\n• "
                        )}\n\`\`\``
                    ),
                ],
            });
        }

        const name = args[0].toLowerCase();
        const alias = commands.find(
            (c) => c.aliases && c.aliases.includes(name)
        );
        const command = commands.get(name) || alias;
        const category = categories.find(
            (c) => c.name.toLowerCase() === `${args.join(" ").toLowerCase()}`
        );

        if (!command && !category) {
            return message.channel.send(
                `${t("errors:cmdOrCatNotFound")}, ${message.author}`
            );
        }

        if (command) {
            command.usage = command.getUsage(t);
            pages[0].setDescription(
                t(`cmds:help.cmdHelp`, { cmd: command.name })
            );
            pages[0].addField(t("misc:cmd_name"), command.name);

            let desc = t(`cmds:${command.name}.cmdDesc`);
            if (command.botPerms && command.botPerms.length > 0) {
                desc += `\nThe bot needs ${beautifyPerms(
                    command.botPerms,
                    message.client.allPerms,
                    t
                ).join(", ")} permission(s) to execute this command.`;
            }
            pages[0].addField("Description", desc);
            if (command.aliases && command.aliases?.length)
                pages[0].addField("Aliases: ", command.aliases.join(", "));
            if (command.memberPerms && command.memberPerms.length > 0)
                pages[0].addField(
                    "User Permissions",
                    `You need ${beautifyPerms(
                        command.memberPerms,
                        this.client.allPerms,
                        t
                    ).join(", ")} permission(s) to execute this command.`
                );
            if (command.subcommands) {
                const subcommands = [];
                for (let i = 0; i < command.subcommands.length; i++) {
                    subcommands.push(
                        `\`${command.subcommands[i].name}\` - ${command.subcommands[i].desc}`
                    );
                }
                pages[0].addField("Subcommands", subcommands.join(`\n`));
            }
            if (command.usage)
                pages[0].addField(
                    "Usage",
                    `\`\`\`\n${guildDB.prefix}${command.name} ${command.usage}\n\`\`\`` +
                        `\n${t("misc:usageKey")}`
                );

            pages[0].addField(
                "Cooldown:",
                `${command.cooldown || 3} second(s)`
            );
        } else if (category) {
            const commandsInCat = [];
            commands.each((cmd) => {
                if (cmd.category.toLowerCase() === category.name.toLowerCase())
                    commandsInCat.push(
                        `${cmd.name} - ${t(`cmds:${cmd.name}.cmdDesc`)}`
                    );
            });
            pages[0].addField(
                "Commands in this category",
                `\`\`\`\n• ${commandsInCat.join("\n• ")}\n\`\`\``
            );
        }

        message.channel.send({ embeds: [pages[0]] });
    }
};
