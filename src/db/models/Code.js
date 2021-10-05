/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
});

const Code = new mongoose.model("Code", codeSchema);

module.exports = Code;
