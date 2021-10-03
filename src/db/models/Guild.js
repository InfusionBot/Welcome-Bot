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
        default: process.env.BOT_PREFIX ?? "w/",
    },
    lang: {
        type: String,
        required: true,
        trim: true,
        default: "en-US",
    },
    disabled: [String],
    plugins: {
        welcome: {
            enabled: {
                default: true,
                type: Boolean,
            },
            message: {
                default:
                    "Welcome {mention} to the {server} server!\nYou are our {members_formatted} member",
                type: String,
            },
            channel: {
                default: "member-log",
                type: String,
            },
        },
        goodbye: {
            enabled: {
                default: false,
                type: Boolean,
            },
            message: {
                default:
                    "Good Bye {mention}!\nWe are sad to see you go!\nWithout you, we are {members} members",
                type: String,
            },
            channel: {
                default: "",
                type: String,
            },
        },
        modlogs: {
            default: "0",
            type: String,
        },
        autorole: {
            enabled: {
                default: false,
                type: Boolean,
            },
            role: {
                default: "0",
                type: String,
            },
        },
        autopublish: {
            default: false,
            type: Boolean,
        },
        chatbot: {
            enabled: {
                default: false,
                type: Boolean,
            },
            channel: {
                default: "",
                type: String,
            },
        },
        serverlogs: {
            enabled: {
                default: false,
                type: Boolean,
            },
            channel: {
                default: "",
                type: String,
            },
        },
    },
    premium: {
        endsAt: {
            type: Number,
            required: false
        },
        enabled: {
            type: Boolean,
            default: false,
        }
    }
});

const Guild = new mongoose.model("Guild", guildSchema);

module.exports = Guild;
