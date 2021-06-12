module.exports = {
    name: "restart",
    description: "Restart the bot",
    cooldown: 30,
    ownerOnly: true,
    async execute(message, args) {
        let sentMsg;
        message.channel.send("Restarting...")
        .then(msg => {
            message.client.destroy();
            sentMsg = msg;
        })
        .then(() => {
            await new Promise(r => setTimeout(r, 5000)); //Sleep for 5 secs
            message.client.login(process.env.BOT_TOKEN);
            sentMsg.edit("Restarted!");
        });
    },
};
