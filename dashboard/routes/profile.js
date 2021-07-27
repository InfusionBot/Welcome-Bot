/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const { CheckAuth } = require("../utils");
const router = express.Router();
//GET /profile/:userId
router.get("/:userId", (req, res) => {
    let userDB;
    try {
        userDB = req.client.userDbFuncs.getUser(req.params.userId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    res.render("profile", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        userDB2: userDB,
        translate: req.translate,
        currentURL: req.currentURL,
    });
});
router.get("/", CheckAuth, (req, res) => {
    res.redirect(`/profile/${req.user.id}`);
});
module.exports = router;
