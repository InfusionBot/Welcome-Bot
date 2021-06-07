# Discord welcome bot

> A discord.js bot that sends a welcome message when a new user joins

Welcome-bot is a bot built for you, to invite new users to your servers. Customization of welcome messages, in which channel do you want it to send welcome message, etc. can be done easily.

[![GitHub stars](https://img.shields.io/github/stars/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/network)
[![GitHub issues](https://img.shields.io/github/issues/Welcome-Bot/welcome-bot)](https://github.com/Welcome-Bot/welcome-bot/issues)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Welcome-Bot/welcome-bot/blob/main/.github/CODE_OF_CONDUCT.md)
[![Discord Chat](https://img.shields.io/discord/836854115526770708?color=7289da&label=discord)](https://discord.gg/xxU7akJNbC)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/Welcome-Bot/welcome-bot/latest)

## Features
- Welcome message customizable
- Change channel to send welcome message, quickly
- User friendly - help and info commands available
- Multi-purpose
    - Moderation - Ban, unban, kick users

## Docs

See [docs folder](https://github.com/Welcome-Bot/welcome-bot/tree/main/docs)

**Important note**: Remember to read the privacy policy and terms of service in the documentaion before inviting the bot.

## Commands
These are the commands currently available:
- `ping` - Ping the bot.
- `test` - Test by sending welcome message
- `help` - Get help
- `chan` or `channel`
    - `set` - Set welcome channel, channel to send message
    - `get` - Get currently set welcome channel
    - `reset` - Reset channel back to default value
- `message` or `msg`
    - `set` - Set welcome message
    - `get` - Get currently set welcome message
    - `reset` - Reset message back to default value
- `prefix`
    - `set` - Set bot prefix
    - `get` - Get currently set bot prefix
    - `reset` - Reset prefix back to default value

For more info on their subcommands, [click here](https://github.com/Welcome-Bot/welcome-bot/blob/main/docs/commands.md)

## Default values

### Default message

The default welcome message is `Welcome {mention} to the {server} server`. Some placeholders can be used here, for info on those placeholders, [click here](https://github.com/Welcome-Bot/welcome-bot/blob/new-features/docs/commands.md#placeholders-in-welcome-message)

### Default channel

The default welcome channel is set to `new-members`, commonly used welcome channels are:
- `welcome`
- `new-members`
- `new-users`

## Inviting the bot

The bot requires the following permissions:

- Read messages OR View channels (both are same)
- Send messages
- Read Message History

Additionally if you want `Moderation` [feature](#Features) to work, you will need to give:

- Ban Members

To include the `moderation` feature, use this invite link:
> https://discord.com/api/oauth2/authorize?scope=bot&client_id=848459799783669790&permissions=68612

To invite the bot with all the necessary required permissions **(without moderation)** mentioned above you can use this invitation link:
> https://discord.com/oauth2/authorize?scope=bot&client_id=848459799783669790&permissions=68608

Note that when you add the bot without a `pre-made` role, you will need to give it one with the necessary required permissions.

## Setting up the channel

You can to have a channel named `new-members`, the bot will check for channel named `new-members` by default.

You can change this channel name, by using the `channel set` command, more info can be found in [docs for commands](docs/commands.md)

## Botlists

Discord welcome bot can be found on different Botlist sites.
Feel free to upvote him to show your support.

### [Discord.boats](https://discord.boats/bot/848459799783669790)

> Discord Boats is a growing directory of Discord bots to enhance your server - Find the perfect bot for your needs and add it to your server easily, quickly and for free.

[![widget](https://discord.boats/api/widget/848459799783669790/)](https://discord.boats/bot/848459799783669790)

### [Discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/848459799783669790)

> Discord's unbiased list, giving small bots and small servers a big chance!

### [Discord.bots.gg](https://discord.bots.gg/bots/848459799783669790)

> The original Discord bot list, find the right bot for your server today.

## Self hosting

[Click here to see self-hosting docs](https://github.com/Welcome-Bot/welcome-bot/blob/main/docs/self-hosting.md)

## Questions?

Do you have question? Don't hesitate to join our [discord server](https://discord.gg/xxU7akJNbC) and ask for help.

## Contributing

You can find the contributing guidelines [here](https://github.com/Welcome-Bot/welcome-bot/blob/main/.github/CONTRIBUTING.md)
