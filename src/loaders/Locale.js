const i18next = require("i18next");
const translationBackend = require("i18next-fs-backend");
const fs = require("fs");

module.exports = async (client, dirPath = "src/locales") => {
    const dir = fs.readdirSync(dirPath);
    try {
        await i18next.use(translationBackend).init(
            {
                ns: ["categories", "cmds", "permissions"],
                preload: dir,
                fallbackLng: "en-US",
                backend: {
                    loadPath: `${dirPath}/{{lng}}/{{ns}}.json`,
                },
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
        return true;
    } catch (e) {
        client.logger.log(JSON.stringify(e, null, 4), "error");
    }
    return false;
};
