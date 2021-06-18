# Changelog v1

The Changelog of the major version 1 of Discord welcome bot.

Note that the displayed date is in the format `dd-mm-yyyy`

[Older changelogs](#older-changelogs)

## [v1.6.0]

> **Released:** `TBA`

### New features

- New command `follow` - Send news and version updates to a specific channel
- New command `prune` - Prune (delete) messages
- You can use default prefix also after setting custom prefix
- New command `lib` - Find out what library is used to build bot

### Changes

- Upgrade to djs v13 ([#25])
- Rename `info` command to `botinfo`

## [v1.5.1]

> **Released:** `15-06-2021`

### Bug fixes

- Fix bug: not posting server count to botlist.space ([#23])

### Changes

- Use embed to send welcome message!

## [v1.5.0]

> **Released:** `15-06-2021`

### New features

- New command `invite` - Get invite link to invite the bot to your server
- A paginated help
- New command category: `Fun`
- New command `image` - Get a random pokemon image
- New command `pokemon` - Get image for a pokemon character
- Send `Thank you for choosing this bot!...` after bot is invited to a guild
- New command `enable` - To enable/disable welcome & goodBye logs
- Send thank you for inviting bot message in a server's system channel after invited.
- New command `figlet` - Implement the FIGfont spec

### Changes

- Add option to subscribe/unsubcribe to version updates.
- New class `WelcomeBot` which extends class `Discord.Client`

## [v1.4.0]

> **Released:** `12-06-2021`

### Bug fixes

- Fix bug `msg not working` (Issue: [#19]) ([#20])
- Fix goodBye

### Changes

- Add new subcommands for `channel` command - `setMod`, `getMod`, `resetMod` ([#20])
- Add new command version ([#20])
- Add mkcommand script ([#20])
- Moderation logger also! ([#20])
- Add `restart` command for owner ([#20])

## [v1.3.0]

> **Released:** `12-06-2021`

### Bug fixes

- Help command shows `permissions required by bot` from `permissions`, instead it should show from `bot_perms`

### New features

- Add eval, reload command for owner only

## [v1.2.1]

> **Released:** `10-06-2021`

### Bug fixes

- Fix "Error: Cannot find module '/app/node_modules/welcome-bot/src/app.js'"

## [v1.2.0]

> **Released:** `10-06-2021`

### Additions

- Add info, stats, user, kick, ban, unban command and this bot can now be used as a logger for members in server ([#17])

## [v1.1.1]

> **Released:** `07-06-2021`

### Bug fixes

- Fix `prefix not defined`

## [v1.1.0]

> **Released:** `06-06-2021`

### Changes

- Add help command ([#13])

## [v1.0.0]

> **Released:** `05-06-2021`

### Changes

- Fix links
- Add `.npmignore`
- Now this bot is added to the list of bots in [discord.boats] and updates the no of guilds the bot is joined, to discord.boats ([#3])
- Change welcome message ([#6])
- Add docs folder ([#8])

<!-- Links -->
[discord.boats]: https://discord.boats/
[#25]: https://github.com/Welcome-Bot/welcome-bot/pull/25
[#23]: https://github.com/Welcome-Bot/welcome-bot/pull/23
[#20]: https://github.com/Welcome-Bot/welcome-bot/pull/20
[#19]: https://github.com/Welcome-Bot/welcome-bot/issue/19
[#17]: https://github.com/Welcome-Bot/welcome-bot/pull/17
[#13]: https://github.com/Welcome-Bot/welcome-bot/pull/13
[#8]: https://github.com/Welcome-Bot/welcome-bot/pull/8
[#3]: https://github.com/Welcome-Bot/welcome-bot/pull/3
[#6]: https://github.com/Welcome-Bot/welcome-bot/pull/6
[v1.5.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.5.0
[v1.4.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.4.0
[v1.3.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.3.0
[v1.2.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.2.1
[v1.2.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.2.0
[v1.1.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.1.1
[v1.1.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.1.0
[v1.0.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.0.0

## Older changelogs

- [v0](https://github.com/Welcome-Bot/welcome-bot/blob/v0.1.0/CHANGELOG.md)
