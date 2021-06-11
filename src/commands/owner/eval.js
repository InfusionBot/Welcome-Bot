const fs = require("fs");

module.exports = {
    name: "eval",
    description: "Execute a statement",
    args: true,
    usage: "[statement]",
    cooldown: 30,
    ownerOnly: true,
    execute(message, args) {
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result
            .then((output) => {
                if (typeof output !== "string") {
                    output = require("util").inspect(output, { depth: 0 });
                }

                if (output.includes(message.client.token)) {
                    output = output.replace(message.client.token, "T0K3N");
                }
                message.channel.send(output, {
                    code: "js",
                });
            })
            .catch((err) => {
                err = err.toString();
                if (err.includes(message.client.token)) {
                    err = err.replace(message.client.token, "T0K3N");
                }
                message.channel.send(err, {
                    code: "js",
                });
            });
    },
};
