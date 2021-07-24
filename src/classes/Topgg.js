/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Topgg = require("@top-gg/sdk");
const api = new Topgg.Api(process.env.TOPGG_token);
const webhook = new Topgg.Webhook(process.env.TOPGG_Wtoken);
module.exports = {
    api,
    webhook,
};
