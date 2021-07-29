/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const { CheckAuth } = require("../utils");
const router = express.Router();
//GET /profile/:userId
router.get("/:userId", async (req, res) => {
    let userDB;
    let user;
    try {
        userDB = await req.client.userDbFuncs.getUser(req.params.userId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    try {
        user = await req.client.users.fetch(req.params.userId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    if (!userDB) {
        return res.send({
            error: "404",
            message: "User not found in database",
        });
    }
    if (!user) {
        return res.send({ error: "404", message: "User not found in discord" });
    }
    res.render("profile", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        userDB2: userDB,
        user2: user,
        translate: req.translate,
        currentURL: req.currentURL,
    });
    res.end();
});
//GET /profile
router.get("/", CheckAuth, (req, res) => {
    res.redirect(`/profile/${req.user.id}`);
});
module.exports = router;
