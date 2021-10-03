/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
    versionName: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    changelog: [String],
});

const Version = new mongoose.model("Version", versionSchema);

module.exports = Version;
