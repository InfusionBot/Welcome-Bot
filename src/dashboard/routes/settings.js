/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//GET /settings
router.get("/", (req, res) => {
    const userDB = req.userDB;
    if (
        !req.user ||
        !userDB
    ) {
        return res.render("404", {
            user: req.user,
            userData: req.userData,
            userDB: req.userDB,
            translate: req.translate,
            currentURL: req.currentURL,
        });
    }
    res.render("settings", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        translate: req.translate,
        currentURL: req.currentURL,
    });
    res.end();
});
//POST /settings
router.post("/", CheckAuth, async (req, res) => {
    const userDB = req.userDB;
    if (
        !req.user ||
        !userDB
    ) {
        return res.render("404", {
            user: req.user,
            userData: req.userData,
            userDB: req.userDB,
            translate: req.translate,
            currentURL: req.currentURL,
        });
    }
    const data = req.body;
    if (data?.bio && data.bio.length >= 1 && data.bio.length < 50) {
        userDB.bio = `${data.bio}`;
        userDB.markModified("bio");
    }
    await userDB.save();
    res.redirect(303, "/settings");
});
module.exports = router;
