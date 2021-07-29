/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//GET /logout
router.get("/", async (req, res) => {
    await req.session.destroy();
    res.send("Logged out");
    res.end();
});
module.exports = router;
