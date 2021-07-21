/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
