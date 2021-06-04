require("../db/connection");
const updateGuild = require("../db/functions/updateGuild");
const getGuild = require("../db/functions/getGuild");

module.exports = async (message, client) => {
    let guildDB = await getGuild(message.guild.id);
    if (message.content.startsWith(guildDB.prefix)) {
<<<<<<< HEAD
        const args = message.content
            .slice(guildDB.prefix.length)
            .trim()
            .split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) return;

        if (command.guildOnly && message.channel.type === "dm") {
            return message.reply("I can't execute that command inside DMs!");
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply("You don't have permission to do this!");
            }
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error trying to execute that command!");
=======
        message.channel.startTyping();
        const commandBody = message.content.slice(guildDB.prefix.length);
        const args = commandBody.trim().split(" ");

        if (args.length > 0) {
            switch (args[0].toLowerCase()) {
                case "ping":
                    message.reply("Pong!");
                    break;
                case "test":
                    //Test greetUser function
                    if (message.member.hasPermission("ADMINISTRATOR")) {
                        greetUser(message.guild, message.member);
                    }
                    break;
                case "prefix":
                    if (args.length > 1) {
                        switch (args[1].toLowerCase()) {
                            case "set":
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    if (args.length > 2) {
                                        //Set bot prefix: ;
                                        updateGuild(
                                            message.guild.id,
                                            "prefix",
                                            args
                                                .join(" ")
                                                .replace(
                                                    `${args[0]} ${args[1]} `,
                                                    ""
                                                )
                                                .replace(" ", "")
                                        ); //replace(" ", "") to replace empty space, there is no empty space in a prefix
                                        message.reply(
                                            "Prefix set to '" +
                                                args
                                                    .join(" ")
                                                    .replace(
                                                        `${args[0]} ${args[1]} `,
                                                        ""
                                                    )
                                                    .replace(" ", "") +
                                                "' (without quotes)"
                                        );
                                    } else {
                                        message.reply(
                                            "You need to supply 'prefix' value!"
                                        );
                                    }
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            case "get":
                                //Get bot prefix
                                message.reply(
                                    "Prefix in this server is set to '" +
                                        guildDB.prefix +
                                        "' (without quotes)"
                                );
                                break;
                            case "reset":
                                guildDB = await getGuild(message.guild.id);
                                //Reset bot prefix
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    updateGuild(
                                        message.guild.id,
                                        "prefix",
                                        "!w"
                                    );
                                    message.reply(
                                        "Prefix reset to '!w' (without quotes)"
                                    );
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            default:
                                message.reply(
                                    "Are you trying to run a subcommand?\nI think you have a typo in the subcommand."
                                );
                                break;
                        }
                    } else {
                        message.reply(
                            "The subcommands available for 'prefix' are 'set', 'get' and 'reset'"
                        );
                    }
                    break;
                case "chan":
                    if (args.length > 1) {
                        switch (args[1].toLowerCase()) {
                            case "set":
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    if (args.length > 2) {
                                        //Set welcome channel
                                        updateGuild(
                                            message.guild.id,
                                            "welcomeChannel",
                                            args
                                                .join(" ")
                                                .replace(
                                                    `${args[0]} ${args[1]} `,
                                                    ""
                                                )
                                                .replace(" ", "")
                                        ); //replace(" ", "") to replace empty space, there is no empty space in a channel name
                                        message.reply(
                                            "Welcome channel set to '" +
                                                args
                                                    .join(" ")
                                                    .replace(
                                                        `${args[0]} ${args[1]} `,
                                                        ""
                                                    )
                                                    .replace(" ", "") +
                                                "' (without quotes)"
                                        );
                                    } else {
                                        message.reply(
                                            "You need to supply 'chan' value!"
                                        );
                                    }
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            case "get":
                                //Get welcome channel
                                message.reply(
                                    "Channel currently is set to '" +
                                        guildDB.welcomeChannel +
                                        "' (without quotes)"
                                );
                                break;
                            case "reset":
                                guildDB = await getGuild(message.guild.id);
                                //Reset welcome channel
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    updateGuild(
                                        message.guild.id,
                                        "welcomeChannel",
                                        "new-members"
                                    );
                                    message.reply(
                                        "Channel reset to 'new-members' (without quotes)"
                                    );
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            default:
                                message.reply(
                                    "Are you trying to run a subcommand?\nI think you have a typo in the subcommand."
                                );
                                break;
                        }
                    } else {
                        message.reply(
                            "The subcommands available for 'chan' are 'set', 'get' and 'reset'"
                        );
                    }
                    break;
                case "message":
                    if (args.length > 1) {
                        switch (args[1].toLowerCase()) {
                            case "set":
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    if (args.length > 2) {
                                        //Set welcome message
                                        updateGuild(
                                            message.guild.id,
                                            "welcomeMessage",
                                            args
                                                .join(" ")
                                                .replace(
                                                    `${args[0]} ${args[1]} `,
                                                    ""
                                                )
                                        );
                                        message.reply(
                                            "Welcome message set to '" +
                                                args
                                                    .join(" ")
                                                    .replace(
                                                        `${args[0]} ${args[1]} `,
                                                        ""
                                                    ) +
                                                "' (without quotes)"
                                        );
                                    } else {
                                        message.reply(
                                            "You need to supply 'message' value!"
                                        );
                                    }
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            case "get":
                                //Get welcome channel
                                message.reply(
                                    "Message currently is set to '" +
                                        guildDB.welcomeMessage +
                                        "' (without quotes)"
                                );
                                break;
                            case "reset":
                                guildDB = await getGuild(message.guild.id);
                                //Reset welcome channel
                                if (
                                    message.member.hasPermission(
                                        "ADMINISTRATOR"
                                    )
                                ) {
                                    updateGuild(
                                        message.guild.id,
                                        "welcomeMessage",
                                        "Welcome {mention} to the {server} server"
                                    );
                                    message.reply(
                                        "Message reset to 'Welcome {mention} to the {server} server' (without quotes)"
                                    );
                                } else {
                                    message.reply(
                                        "Sorry, You don't have ADMINISTRATOR permission"
                                    );
                                }
                                break;
                            default:
                                message.reply(
                                    "Are you trying to run a subcommand?\nI think you have a typo in the subcommand."
                                );
                                break;
                        }
                    } else {
                        message.reply(
                            "The subcommands available for 'message' are 'set', 'get' and 'reset'"
                        );
                    }
                    break;
                default:
                    message.reply(
                        "Are you trying to run a command?\nI think you have a typo in the command."
                    );
                    break;
            }
        } else {
            message.reply(
                "Are you trying to run a command?\nI think you have a typo in the command."
            );
>>>>>>> 03f4d83 (fixed commands)
        }
        message.channel.stopTyping();
    }
};
