/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const i18next = require("i18next");
const translationBackend = require("i18next-node-fs-backend");
const fs = require("fs");

module.exports = async (client, dirPath = __dirname + "/../locales") => {
    let dir;
    if (fs.existsSync(dirPath)) {
        dir = fs.readdirSync(dirPath);
    } else {
        client.logger.log(`Can't read ${dirPath}`);
    }
    try {
        await i18next.use(translationBackend).init(
            {
                ns: ["categories", "cmds", "errors", "permissions", "misc"],
                preload: dir,
                fallbackLng: "en-US",
                whitelist: Object.keys(
                    require(dirPath + `/en-US/languages.json`)
                ),
                backend: {
                    loadPath: `${dirPath}/{{lng}}/{{ns}}.json`,
                },
                interpolation: {
                    escapeValue: false,
                },
                //debug: client.debug,
                returnEmptyString: false,
            },
            () => {
                client.logger.log("i18next initialized", "debug");
            }
        );
        client.i18next = i18next;
        return true;
    } catch (e) {
        client.logger.log(JSON.stringify(e, null, 4), "error");
    }
    return false;
};
