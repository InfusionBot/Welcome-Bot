/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed } = require("discord.js");
module.exports = class Embed extends MessageEmbed {
    constructor(opts = {}, data = {}) {
        super(data);
        this.setDesc = this.setDescription;
        let { color = null } = opts;
        const {
            tag = null,
            avatarURL = null,
            timestamp = true,
            footer = null,
        } = opts;
        switch (color?.toLowerCase?.()) {
            case "error":
                color = "#ff3333";
                break;
            case "red":
                color = "#ff0000";
                break;
            case "success":
                color = "#33ddff";
                break;
            case "blue":
                color = "#0091fc";
                break;
            case "green":
                color = "#00ff00";
                break;
            case "lightblue":
                color = "#76b3fc";
                break;
            case "pink":
                color = "#da70d6";
                break;
            default:
                if (!color) color = "RANDOM";
                break;
        }
        this.setColor(color);
        if (tag && avatarURL) this.setAuthor(`${tag}`, `${avatarURL}`);
        else if (tag) this.setAuthor(`${tag}`);
        if (footer) this.setFooter(`${footer}`);
        else this.setFooter("Copyright 2021 The Welcome-Bot Team");
        if (timestamp) this.setTimestamp();
    }
};
