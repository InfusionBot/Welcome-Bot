const { MessageEmbed } = require('discord.js')
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "setnick",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                },
                disabled: false,
                cooldown: 5,
                category: "Admin",
                slash: true,
            },
            client
        );
    }
     async execute({ message, args }, t) {
     if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      return message.channel.send(
        "You should have Manage Nickname perms to use this command"
      );
    }
      let user = message.mentions.users.first()
    if(!user) return message.reply("**Please mention a User to change his nickname!**")

    let nickname = args.slice(1).join(" ") 
    if(!nickname) return message.reply("**Please specify a nickname!**")
    let member = message.guild.members.cache.get(user.id);
    await member.setNickname(nickname);

    const embed = new MessageEmbed()
    .setTitle("✅ Done!")
    .setDescription(`successfully changed ${user.tag}'s nickname to ${nickname}`)
    .setColor('RANDOM')
    .setTimestamp()
    message.channel.send({embeds:[embed]})
     }}
