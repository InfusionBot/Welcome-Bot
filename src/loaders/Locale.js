const i18next = require("i18next");
const translationBackend = require("i18next-node-fs-backend");
const fs = require("fs");
const fetch = require("node-fetch");
const unzip = require("unzipper");

module.exports = async (client, dirPath = __dirname + "/../locales") => {
    //Download all locales from translations branch and extract it
    fetch(
        "https://github.com/Welcome-Bot/welcome-bot/archive/refs/heads/translations.zip"
    ).then((res) => {
        res.body.pipe(unzip.Extract({ path: dirPath.replace("/locales", "") }));
    });
    if (fs.existsSync(dirPath.replace("/locales", "/translations"))) {
        fs.rmdirSync(dirPath.replace("/locales", "/translations"), {
            recursive: true,
        });
    }
    if (
        fs.existsSync(dirPath.replace("/locales", "/welcome-bot-translations"))
    ) {
        fs.renameSync(
            dirPath.replace("/locales", "/welcome-bot-translations"),
            dirPath.replace("/locales", "/translations"),
            (err) => {
                if (err) throw err;
            }
        );
        dirPath = dirPath.replace("/locales", "/translations");
    } else {
        client.logger.log(
            `Looks like locales not downloaded, can't find ${dirPath.replace(
                "/locales",
                "/welcome-bot-translations"
            )}`
        );
    }
    let dir;
    if (fs.existsSync(dirPath)) {
        dir = fs.readdirSync(dirPath);
    } else {
        client.logger.log(`Can't find ${dirPath}`);
    }
    try {
        await i18next.use(translationBackend).init(
            {
                ns: ["categories", "cmds", "errors", "permissions"],
                preload: dir,
                fallbackLng: "en-US",
                whitelist: Object.keys(
                    require(`${dirPath}/en-US/languages.json`)
                ),
                backend: {
                    loadPath: `${dirPath}/{{lng}}/{{ns}}.json`,
                },
                debug: true,
                interpolation: {
                    escapeValue: false,
                },
                returnEmptyString: false,
            },
            () => {
                client.logger.log("i18next initialized", "debug");
            }
        );
        client.i18next = i18next;
        client.localeDir = dirPath;
        return true;
    } catch (e) {
        client.logger.log(JSON.stringify(e, null, 4), "error");
    }
    return false;
};
