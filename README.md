# Discord welcome bot

> A discord.js bot that sends a welcome message when a new user joins

Welcome-bot is a bot built for you, to welcome new users to your servers mainly. Customization of welcome messages, in which channel do you want it to send welcome message, etc. can be done easily.

[![GitHub stars](https://img.shields.io/github/stars/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/network)
[![GitHub issues](https://img.shields.io/github/issues/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/issues)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Welcome-Bot/welcome-bot/blob/main/.github/CODE_OF_CONDUCT.md)
[![Discord Chat](https://img.shields.io/discord/836854115526770708?color=7289da&label=discord)](https://dsc.gg/welcome-bot-guild)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/Welcome-Bot/welcome-bot/latest)

## Features

### Customizable Settings

Adjust the settings to fit all the needs of your server! You can select the channel to send welcome logs to, the welcome log message, the prefix of the bot for this server, and more…

### Reliable and High Quality

With our revolutionary infrastructure implementation, we’re proud to achieve absolute 99.9% uptime!. This means that Welcome-Bot will always be online, and ready to relay messages between your server staff and users!

### Multi-purpose

We also give you a feature "Moderation" that hepls you to quickly ban, unban and kick users.

### Open Source

We are an open source project on [GitHub](https://github.com/Welcome-Bot/welcome-bot). Don’t believe what we’ve said earlier? Check out the source code for yourself! This means the maximum level of transparency, so you’ll never have to worry about privacy concerns.

## Docs

Check out the docs on the [site](https://welcome-bot.github.io/docs)

**Important note**: Remember to read the privacy policy and terms of service in the documentaion before inviting the bot.

## Commands
These are the commands currently available:

### Setup

- [`channel`](https://welcome-bot.github.io/docs/commands.html#channel)
    - `set` - Set welcome channel, channel to send message
    - `setMod` - Set moderation logs channel
    - `get` - Get currently set welcome channel
    - `getMod` - Get currently set moderation logs channel
    - `reset` - Reset welcome channel back to default value
    - `resetMod` - Reset moderation logs channel back to default value
- [`message`](https://welcome-bot.github.io/docs/commands.html#message)
    - `set` - Set welcome message
    - `get` - Get currently set welcome message
    - `reset` - Reset message back to default value
- [`prefix`](https://welcome-bot.github.io/docs/commands.html#prefix)
    - `set` - Set bot prefix
    - `get` - Get currently set bot prefix
    - `reset` - Reset prefix back to default value

### General

- [`help` - Get help](https://welcome-bot.github.io/docs/commands.html#help)
- [`ping` - Ping the bot.](https://welcome-bot.github.io/docs/commands.html#ping)
- [`invite` - Get the invite link to invite the bot to your server](https://welcome-bot.github.io/docs/commands.html#invite)

### Information

- [`info` - Information about the bot.](https://welcome-bot.github.io/docs/commands.html#info)
- [`stats` - Server statistics.](https://welcome-bot.github.io/docs/commands.html#stats)
- [`user` - Information on a user.](https://welcome-bot.github.io/docs/commands.html#user)
- [`version` - The changelog of bot on a specific version](https://welcome-bot.github.io/docs/commands.html#version)

### Moderation

- [`ban` - Ban a user](https://welcome-bot.github.io/docs/commands.html#ban)
- [`unban` - Unban a user](https://welcome-bot.github.io/docs/commands.html#unban)
- [`kick` - Kick a user](https://welcome-bot.github.io/docs/commands.html#kick)

### Miscellaneous

- [`test` - Test by sending welcome message](https://welcome-bot.github.io/docs/commands.html#test)

For more info on these commands, [visit our site](https://welcome-bot.github.io/docs/commands.html)

## Default values

### Default message

The default welcome message is `Welcome {mention} to the {server} server!\nYou are our #{members} member`. Some placeholders can be used here, for info on those placeholders, [click here](https://welcome-bot.github.io/docs/commands.html#placeholders-in-welcome-message)

### Default channel

The default welcome channel is set to `new-members`, commonly used welcome channels are:
- `welcome`
- `new-members`
- `member-log`

## Inviting the bot

The bot requires the following permissions:

- Read messages OR View channels (both are same)
- Send messages
- Read Message History
- Manage messages

Additionally if you want `Moderation` [feature](#Features) to work, you will need to give:

- Ban Members
- Kick Members

To include the `moderation` feature, use this invite link:
> https://dsc.gg/welcome-bot

To invite the bot with all the necessary required permissions **except permissions for moderation feature** mentioned above you can use this invitation link:
> https://dsc.gg/welcome-bot2

## Setting up the channel

### Welcome channel

By default the bot will check for a channel named `new-members`.

You can change this channel name, by using the `channel set` command, more info can be found in [docs for commands](https://welcome-bot.github.io/docs/commands.html#channel)

### Moderation channel

By default the bot will check for a channel named `mod-log`.

You can change this channel name, by using the `channel setMod` command, more info can be found in [docs for commands](https://welcome-bot.github.io/docs/commands.html#channel)

## Botlists

Discord welcome bot can be found on different Botlist sites.
Feel free to upvote him to show your support.

### [Discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/welcome-bot)

> Discord's unbiased list, giving small bots and small servers a big chance!

## [Disbotlist.xyz](https://disbotlist.xyz/bot/848459799783669790)

> Find the best Discord Bots for your server with DisBotList!

### [Discord.boats](https://discord.boats/bot/848459799783669790)

> Discord Boats is a growing directory of Discord bots to enhance your server - Find the perfect bot for your needs and add it to your server easily, quickly and for free.

[![widget](https://discord.boats/api/widget/848459799783669790/)](https://discord.boats/bot/848459799783669790)

### [Discord.bots.gg](https://discord.bots.gg/bots/848459799783669790)

> The original Discord bot list, find the right bot for your server today.

## Self hosting

[Click here to see self-hosting docs](https://welcome-bot.github.io/docs/self-hosting.html)

## Questions?

Do you have question? Don't hesitate to join our [discord server](https://discord.gg/xxU7akJNbC) and ask for help.

## Contributing

You can find the contributing guidelines [here](https://github.com/Welcome-Bot/welcome-bot/blob/main/.github/CONTRIBUTING.md)
