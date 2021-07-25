/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//GET /settings
router.get("/", (req, res) => {
    let userDB;
    try {
        userDB = req.client.userDbFuncs.getUser(req.params.userId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    res.send("Coming soon");
    /*res.render("settings", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        translate: req.translate,
        currentURL: req.currentURL,
    });*/
});
module.exports = router;
