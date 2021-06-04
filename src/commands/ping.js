module.exports = {
	name: 'ping',
  aliases: ['online'],
	description: 'Ping the bot',
  args: false,
	execute(message, args) {
		message.channel.send(`Pong ${message.author}`);
	},
};
