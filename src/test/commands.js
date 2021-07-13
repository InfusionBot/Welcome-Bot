/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const WelcomeBot = require("../WelcomeBot");
const client = new WelcomeBot();
const commands = client.commands.enabled;
//findArrDups is took from https://flexiple.com/find-duplicates-javascript-array/
const findArrDups = (array) => {//find duplicates in an array
    return array.filter((val, index) => {
        return array.indexOf(val) !== index;
    })
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
            done(new Error(`Some of them have duplicate names or aliases, they are: ${duplicates.join(", ")}`));
        }
    })
});
