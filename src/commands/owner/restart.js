module.exports = {
    name: "restart",
    description: "Restart the bot",
    cooldown: 30,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args) {
        let sentMsg;
        message
            .reply("Restarting...")
            .then((msg) => {
                message.client.destroy();
                sentMsg = msg;
            })
            .then(async () => {
                message.client.wait(5000); //Sleep for 5 secs
                message.client.login(process.env.BOT_TOKEN);
                sentMsg.edit("Restarted!");
            });
    },
};
