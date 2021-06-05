module.exports = {
    name: "test",
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Test welcome bot",
    args: false,
    execute(message, args) {
        const greetUser = require("../functions/greetUser");
        greetUser(message.guild, message.member);
    },
};
