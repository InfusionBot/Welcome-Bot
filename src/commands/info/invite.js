/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "invite",
    description: "Get Invite link for the bot",
    cooldown: 20,
    execute(message, args) {
        return message.channel.send(
            "Here's the invite link: https://dsc.gg/welcome-bot2\nWant moderation feature to work also? Use this: https://dsc.gg/welcome-bot"
        );
    },
};
