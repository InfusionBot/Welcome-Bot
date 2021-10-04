/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = [
    Permissions.FLAGS.VIEW_CHANNEL,
    Permissions.FLAGS.SEND_MESSAGES,
    Permissions.FLAGS.READ_MESSAGE_HISTORY,
    Permissions.FLAGS.EMBED_LINKS,
    Permissions.FLAGS.MANAGE_ROLES,
    Permissions.FLAGS.KICK_MEMBERS,
    Permissions.FLAGS.BAN_MEMBERS,
    Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS,
    Permissions.FLAGS.MANAGE_GUILD,
    Permissions.FLAGS.MANAGE_CHANNELS,
    Permissions.FLAGS.MANAGE_WEBHOOKS,
    Permissions.FLAGS.MANAGE_MESSAGES,
    Permissions.FLAGS.ADD_REACTIONS,
    Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
    Permissions.FLAGS.CONNECT,
    Permissions.FLAGS.SPEAK,
    Permissions.FLAGS.CREATE_INSTANT_INVITE,
];
