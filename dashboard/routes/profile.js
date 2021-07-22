/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//GET /profile/:userId
router.get("/:userId", (req, res) => {
    let userDB;
    try {
        userDB = req.client.userDbFuncs.getUser(req.params.userId);
    } catch(e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    res.send("Coming soon");
    /*res.render("profile", {
        userDB: req.userDB,
        userDB2: userDB,
    });*/
});
module.exports = router;
