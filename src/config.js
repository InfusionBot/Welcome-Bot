/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
module.exports = {
    botGuildId: "836854115526770708",
    newsChannelId: "847459283876577360",
    logsChannelId: "855331801635749888",
    votesChannelId: "",
    rewardUserOnVote: true,
    suggestionLogsChannelId: "862126837110800414",
    ownerIDs: [
        "815204465937481749" /*PuneetGopinath#0001*/,
        "693754859014324295" /*abhijoshi2k#6842*/,
    ],
    dbl: {
        port: 2000,
        token: process.env.DBL_token,
    },
    dashboard: {
        port: 8000,
        secret: process.env.SESS_SECRET ?? null,
        enabled: process.env.SESS_SECRET ?? null ? true : false,
        logs: "855331801635749888"
    },
};
