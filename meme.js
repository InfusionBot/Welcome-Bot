const Discord = require('discord.js')
const fetch = require('node-fetch')
const Command = require('bot.js')

module.exports = {
	name: 'meme',
	description: 'See a random meme from reddit.',
	commandOptions: null,
	global: true,
	async execute(interaction) {

        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {

            const embed = new Discord.MessageEmbed()
                .setColor('#00b140')
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`Subreddit: r/${json.subreddit}`)

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [embed]
                    }
                }
            })
        });            
	},
};
