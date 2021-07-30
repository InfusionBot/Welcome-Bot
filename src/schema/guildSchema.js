/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
        default: "w/",
    },
    lang: {
        type: String,
        required: true,
        trim: true,
        default: "en-US",
    },
    disabled: [String],
    plugins: {
        type: Object,
        default: {
            welcome: {
                enabled: true,
                message:
                    "Welcome {mention} to the {server} server!\nYou are our #{members_formatted} member",
                channel: "member-log",
            },
            goodbye: {
                enabled: false,
                message:
                    "Good Bye {mention}!\nWe are sad to see you go!\nWithout you, we are {{members}} members",
                channel: null,
            },
            modlogs: "mod-log",
        },
    },
});

const Guild = new mongoose.model("Guild", guildSchema);

module.exports = Guild;
