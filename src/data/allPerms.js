/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = [
    { perm: Permissions.FLAGS.ADMINISTRATOR, val: "ADMINISTRATOR" },
    {
        perm: Permissions.FLAGS.CREATE_INSTANT_INVITE,
        val: "CREATE_INSTANT_INVITE",
    },
    { perm: Permissions.FLAGS.KICK_MEMBERS, val: "KICK_MEMBERS" },
    { perm: Permissions.FLAGS.BAN_MEMBERS, val: "BAN_MEMBERS" },
    { perm: Permissions.FLAGS.MANAGE_CHANNELS, val: "MANAGE_CHANNELS" },
    { perm: Permissions.FLAGS.MANAGE_GUILD, val: "MANAGE_GUILD" },
    { perm: Permissions.FLAGS.ADD_REACTIONS, val: "ADD_REACTIONS" },
    { perm: Permissions.FLAGS.VIEW_AUDIT_LOG, val: "VIEW_AUDIT_LOG" },
    {
        perm: Permissions.FLAGS.PRIORITY_SPEAKER,
        val: "PRIORITY_SPEAKER",
    },
    { perm: Permissions.FLAGS.STREAM, val: "STREAM" },
    { perm: Permissions.FLAGS.VIEW_CHANNEL, val: "VIEW_CHANNEL" },
    { perm: Permissions.FLAGS.SEND_MESSAGES, val: "SEND_MESSAGES" },
    {
        perm: Permissions.FLAGS.SEND_TTS_MESSAGES,
        val: "SEND_TTS_MESSAGES",
    },
    { perm: Permissions.FLAGS.MANAGE_MESSAGES, val: "MANAGE_MESSAGES" },
    { perm: Permissions.FLAGS.EMBED_LINKS, val: "EMBED_LINKS" },
    { perm: Permissions.FLAGS.ATTACH_FILES, val: "ATTACH_FILES" },
    {
        perm: Permissions.FLAGS.READ_MESSAGE_HISTORY,
        val: "READ_MESSAGE_HISTORY",
    },
    {
        perm: Permissions.FLAGS.MENTION_EVERYONE,
        val: "MENTION_EVERYONE",
    },
    {
        perm: Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
        val: "USE_EXTERNAL_EMOJIS",
    },
    {
        perm: Permissions.FLAGS.VIEW_GUILD_INSIGHTS,
        val: "VIEW_GUILD_INSIGHTS",
    },
    { perm: Permissions.FLAGS.CONNECT, val: "CHANGE_NICKNAME" },
    { perm: Permissions.FLAGS.SPEAK, val: "SPEAK" },
    { perm: Permissions.FLAGS.MUTE_MEMBERS, val: "MUTE_MEMBERS" },
    { perm: Permissions.FLAGS.DEAFEN_MEMBERS, val: "DEAFEN_MEMBERS" },
    { perm: Permissions.FLAGS.MOVE_MEMBERS, val: "MOVE_MEMBERS" },
    { perm: Permissions.FLAGS.USE_VAD, val: "USE_VAD" },
    { perm: Permissions.FLAGS.CHANGE_NICKNAME, val: "CHANGE_NICKNAME" },
    {
        perm: Permissions.FLAGS.MANAGE_NICKNAMES,
        val: "MANAGE_NICKNAMES",
    },
    { perm: Permissions.FLAGS.MANAGE_ROLES, val: "MANAGE_ROLES" },
    { perm: Permissions.FLAGS.MANAGE_WEBHOOKS, val: "MANAGE_WEBHOOKS" },
    {
        perm: Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS,
        val: "MANAGE_EMOJIS_AND_STICKERS",
    },
    {
        perm: Permissions.FLAGS.USE_APPLICATION_COMMANDS,
        val: "USE_APPLICATION_COMMANDS",
    },
    {
        perm: Permissions.FLAGS.REQUEST_TO_SPEAK,
        val: "REQUEST_TO_SPEAK",
    },
    {
        perm: Permissions.FLAGS.MANAGE_THREADS,
        val: "MANAGE_THREADS",
    },
    {
        perm: Permissions.FLAGS.USE_PUBLIC_THREADS,
        val: "USE_PUBLIC_THREADS",
    },
    {
        perm: Permissions.FLAGS.USE_PRIVATE_THREADS,
        val: "USE_PRIVATE_THREADS",
    },
    {
        perm: Permissions.FLAGS.USE_EXTERNAL_STICKERS,
        val: "USE_EXTERNAL_STICKERS",
    },
];
