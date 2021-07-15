/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const WelcomeBot = require("../WelcomeBot");
const client = new WelcomeBot();
const commands = client.commands.enabled;
require("../loaders/Locale.js")(client).then(success => console.log("Locales are " + (success ? "loaded" : "not loaded")));
//findArrDups is took from https://flexiple.com/find-duplicates-javascript-array/
const findArrDups = (array) => {
    //find duplicates in an array
    return array.filter((val, index) => {
        return array.indexOf(val) !== index;
    });
};
describe("Commands", () => {
    it("should have no duplicate names or aliases", (done) => {
        const aliases = commands.reduce((arr, command) => {
            const { name } = command;
            const aliases = command?.aliases || [];
            return [...arr, name, ...aliases];
        }, []);
        const duplicates = findArrDups(aliases);
        if (!duplicates.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of them have duplicate names or aliases, they are: ${duplicates.join(
                        ", "
                    )}`
                )
            );
        }
    });

    it("should be defined in cmds.json", (done) => {
        const t = client.i18next.getFixedT("en-US");
        const cmds = commands.reduce((arr, command) => {
            const { name } = command;
            return [...arr, name];
        }, []);
        let errors = [];
        for (var i = 0; i < cmds.length; i++) {
            if (t(`cmds:${cmds[i]}.cmdDesc`) === `${cmds[i]}.cmdDesc`) {
                errors.push(cmds[i]);
            }
        }
        if (!errors.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of the cmds are not defined in cmds.json, they are ${errors.join(", ")}`
                )
            );
        }
    });

    it("should have proper category name", (done) => {
        const { categories } = client;
        let categoryNames = [];
        for (var i = 0; i < categories.length; i++) {
            categoryNames.push(categories[i].name);
        }
        const cmdCats = commands.reduce((arr, command) => {
            const { category } = command;
            return [...arr, category];
        }, []);
        let errors = [];
        for (var i = 0; i < cmdCats.length; i++) {
            if (!categoryNames.includes(cmdCats[i])) {
                errors.push(cmdCats[i]);
            }
        }
        if (!errors.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of the cmds have wrong category name, they are ${errors.join(", ")}`
                )
            );
        }
    });
});
