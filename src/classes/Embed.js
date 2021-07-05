/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

const { MessageEmbed } = require("discord.js");
module.exports = class Embed extends MessageEmbed {
    constructor({tag, avatarURL, color, timestamp}) {
        switch (color.toLowerCase()) {
            case "error":
                color = "#ff0000";
                break;
            case "success":
                color = "#33ddff";
                break;
            default:
                if (!color) color = "RANDOM";
                break;
        }
        this.setColor(color);
        if (timestamp) this.setTimestamp();
        if (tag && avatarURL) this.setFooter(
            `Requested by ${tag}`,
            `${avatarURL}`
        );
    }
};
