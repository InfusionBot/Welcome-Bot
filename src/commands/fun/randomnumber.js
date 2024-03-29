/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
  constructor(client) {
    super(
      {
        name: "randomnumber",
        aliases: [],
        memberPerms: [],
        botPerms: [],
        disabled: false,
        cooldown: 5,
        category: "Fun",
        options: [
          {
            name: "max",
            description: "The maximum number that can be generated, defaults to 100.",
            type: "STRING",
            required: false,
          },
        ],
      },
      client
    );
  }

  execute({ message, args }, t) {
    const max = parseInt(args[0]) || 100
    //TODO: Add translation
    const embed = new Embed()
      .setDescription(`Your random number between 0 and ${max} is: **${Math.round(Math.random() * max)}**`);
    message.channel.send({ embeds: [embed] });
  }
};
