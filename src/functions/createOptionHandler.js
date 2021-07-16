/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = (className, opts) => {
    if (typeof opts === "undefined") {
        throw new Error("createOptionHandler: expected opts arg to not be undefined, but received undefined");
    }
    return {
        optional: (key, defaultVal) => {
            const val = opts?.[key];
            if (typeof val === "object" && typeof defaultVal === "object") {
                opts[key] = {
                    ...defaultVal,
                    ...val,
                };
            } else if (typeof val === "array" && typeof defaultVal === "array") {
                opts[key] = [
                    ...defaultVal,
                    ...val,
                ];
            } else if (typeof val === "undefined") {
                return defaultVal;
            }
            return opts[key];
        },

        required: (key) => {
            if (typeof opts?.[key] === "undefined") {
                throw new Error(`${key} key in opts of ${className} class is required.`);
            } else {
                return opts[key];
            }
        }
    };
};
