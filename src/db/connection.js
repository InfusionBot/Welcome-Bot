/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });

module.exports = mongoose;
