/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = class CrowdinAPI {
    constructor() {
        this.url = `https://${this.org}.api.crowdin.com/api/v2`;
        this.token = process.env.CROWDIN_token;
    }

    addQueryParam(url, name, value) {
        if (value) {
            url += new RegExp(/\?.+=.*/g).test(url) ? "&" : "?";
            url += `${name}=${value}`;
        }
        return url;
    }
};
