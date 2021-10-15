/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
/* eslint-disable no-undef */
process.env.TEST_MODE = true;
const WelcomeBot = require("../WelcomeBot");
const client = new WelcomeBot();
//findArrDups is took from https://flexiple.com/find-duplicates-javascript-array/
const findArrDups = (array) => {
    //find duplicates in an array
    return array.filter((val, index) => {
        return array.indexOf(val) !== index;
    });
};
describe("Commands", () => {
    ["Command"].forEach((f) => {
        client.logger.log(`Loading ${f}s`);
        require(`../loaders/${f}`)(client);
        client.logger.log(`Finished loading ${f}s`);
    });
    const commands = client.commands.enabled;
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

    it("should have only lowercase names and aliases", (done) => {
        const aliases = commands.reduce((arr, command) => {
            const { name } = command;
            const aliases = command?.aliases || [];
            return [...arr, name, ...aliases];
        }, []);
        let errors = [];
        for (var i = 0; i < aliases.length; i++) {
            if (aliases[i] !== aliases[i].toLowerCase()) {
                errors.push(aliases[i]);
            }
        }
        if (!errors.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of them don't have lowercase names and aliases, they are: ${errors.join(
                        ", "
                    )}`
                )
            );
        }
    });

    it("should be defined in cmds.json", (done) => {
        const cmdsFile = require("../locales/en-US/cmds.json");
        const cmds = commands
            .filter((c) => c.category.indexOf("Owner") === -1)
            .map((c) => c.name);
        let errors = [];
        for (let i = 0; i < cmds.length; i++) {
            if (!cmdsFile[cmds[i]]?.cmdDesc) {
                errors.push(cmds[i]);
            }
        }
        if (!errors.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of the cmds are not defined in cmds.json, they are ${errors.join(
                        ", "
                    )}`
                )
            );
        }
    });

    it("should have proper category name", (done) => {
        if (!client.i18next) {
            //Wait 10 seconds if client.i18next is not defined
            client.wait(10);
        }
        const { categories } = client;
        let categoryNames = [];
        for (var i = 0; i < categories.length; i++) {
            categoryNames.push(categories[i].name);
        }
        const cmdCats = commands.reduce((arr, command) => {
            if (command.category.indexOf("Owner") !== -1) return [];
            const { category } = command;
            return [...arr, category];
        }, []);
        let errors = [];
        for (let i = 0; i < cmdCats.length; i++) {
            if (!categoryNames.includes(cmdCats[i])) {
                errors.push(cmdCats[i]);
            }
        }
        if (!errors.length) {
            done();
        } else {
            done(
                new Error(
                    `Some of the cmds have wrong category name, they are ${errors.join(
                        ", "
                    )}`
                )
            );
        }
    });
});
