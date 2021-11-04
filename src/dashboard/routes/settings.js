/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const { CheckAuth } = require("../utils");
const router = express.Router();
//GET /settings
router.get("/", CheckAuth, (req, res) => {
    if (!req.user || !req.userDB) {
        console.log(req.user, req.userDB);
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
    const { userDB } = req;
    if (!req.user || !userDB) {
        return res.render("404", {
            user: req.user,
            userData: req.userData,
            userDB: req.userDB,
            translate: req.translate,
            currentURL: req.currentURL,
        });
    }
    const data = req.body;
    if (
        Object.hasOwnProperty.call(data, "bio") &&
        data.bio.length >= 1 &&
        data.bio.length < 100
    ) {
        userDB.bio = `${data.bio}`;
        userDB.markModified("bio");
    }
    if (Object.hasOwnProperty.call(data, "locale")) {
        userDB.locale = `${data.locale}`;
        userDB.markModified("locale");
    }
    await userDB.save();
    res.redirect(303, "/settings");
});
module.exports = router;
