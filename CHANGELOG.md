# Changelog v1

The Changelog of the major version 1 of Discord Welcome-Bot.

Note that the displayed date is in the format `dd-mm-yyyy`

[Older changelogs](#older-changelogs)

[Legend](#legend)

## [v1.11.3]

### Bug fixes

- fix(uptime): Bug in translation
- fix: No cmd would work in DMs

## [v1.11.2]

### Bug fixes

- Fix some problem related to djs

## [v1.11.0]

> **Released:** `TBA`

### New features

- feat: New command `tickle`
- feat: New command `pat`
- feat: New command `suggest`
- feat: New cmd category `Music` - Welcome-Bot now has Music commands.
- feat: `Music` category has commands: `back`, `np`, `play`, `skip`, `stop`, `volume`, `loop`
- feat: New command `addemoji`
- feat: New command `mute`
- feat: New command `unmute`
- feat: New command `hastebin`
- feat: New command `listemojis`

### Changes

- refactor(categories): Remove `Information` category & move those cmds to `General` category
- refactor: Change emoji for General category to ℹ️
- refactor(db): Change `modLogChan` to `modChannel`
- docs: Improve contributing guidelines
- Publish images to docker hub
- tests: Add test script
- ci: Add CI workflow
- build(Dockerfile): Add Dockerfile
- refactor(categories): Remove `Games` category & move those cmds to `Fun` category
- refactor(cmds): Rename `stats` cmd to `serverinfo` cmd
- To reduce caching, sweep out messages older than 14 days
- refactor(categories): Remove `Miscellaneous` category and moved those cmds to `General` category

### Bug fixes

- fix(test cmd): test cmd will now reply if channel is not found out

## [v1.10.3]

> **Released:** `09-07-2021`

### Bug fixes

- Fix test command

## [v1.10.2]

> **Released:** `06-07-2021`

### Bug fixes

- Fix avatar command

## [v1.10.1]

> **Released:** `03-07-2021`

### Bug fixes

- All commands in setup category was not working, fix those all

## [v1.10.0]

> **Released:** `03-07-2021`

### New features

- New command `avatar` - Get avatar of a user
- New translations
- New command `slap`
- New command `8ball`

### Bug fixes

- Fix prune command

### Changes

- From this version, if user does not have a required permission, the bot says that instead of saying `Send w/botperms to get a list of permissions you have given...`
- Docs updater takes command description from en-US locales folder itself now.

## [v1.9.3]

> **Released:** `30-06-2021`

### Changes

- debug in translations

## [v1.9.2]

> **Released:** `30-06-2021`

### Changes

- Some more debugging

## [v1.9.1]

> **Released:** `30-06-2021`

### Changes

- More debugging

## [v1.9.0]

> **Released:** `30-06-2021`

### New features

- New translations

### Bug fixes

- Fix showing `undefined` for commands count in botinfo

### Changes

- Move cuddle, hug, kiss commands to anime category

## [v1.8.0]

> **Released:** `29-06-2021`

### New features

- New command `disable` - Disable welcome / goodBye logs
- Support translation
- New command `lang` - Change language
- New command `hug` - Hug a user
- New command `cuddle` - Cuddle with a user
- New command `kiss` - Kiss a user
- You can get a list of all commands in a category using help command

### Changes

- `enable` command uses subcommands instead of passing boolen args (true, false) and only is used to enable logs
- Add Support for mentioning channels when setting the welcome & mod log channel. i.e. if you send `w/channel set member-log` it will work fine but what if you send `w/channel set #member-log`

### Bug fixes

- Fix bug: ban & unban not not working

## [v1.7.8]

> **Released:** `27-06-2021`

### Bug fixes

- Revert changes

## [v1.7.6]

> **Released:** `27-06-2021`

### Bug fixes

- minor fix

## [v1.7.5]

> **Released:** `27-06-2021`

### Bug fixes

- Fix bug related to permissions (fix 2)

## [v1.7.4]

> **Released:** `27-06-2021`

### Bug fixes

- Fix bug related to permissions

## [v1.7.3]

> **Released:** `26-06-2021`

### Bug fixes

- Fix sending welcome and goodbye logs even when they are disabled

### Chores

- npm(deps): bump mongoose from 5.12.14 to 5.12.15 ([#34])

## [v1.7.2]

> **Released:** `25-06-2021`

### Bug fixes

- Bump version

## [v1.7.1]

> **Released:** `25-06-2021`

### Bug fixes

- Fix bug: `ReferenceError: message is not defined`
- Fix not posting server count to botlist.space

## [v1.7.0]

> **Released:** `24-06-2021`

### Bug fixes

- Fix all moderation commands don't work
- Fix bug: "If user is not in cache, the user won't be found"

### New features

- New command `perms` - Find all permissions given to you or a specific user
- New command `support` - Get support for Welcome-Bot
- New command `botperms` - Get permissions bot has been given

### Changes

- Minor changes to docs auto updater
- Delete Manage category and move prune command to mod category
- Add missing perms which where added in djs v13
- `uptime` command moved from misc category to core category

## [v1.6.1]

> **Released:** `21-06-2021`

### Bug fixes

- Run dbAuditor on start & when no guild found when using `updateGuild` function
- Not sending embed message for new guilds and guilds removed

### Changes

- User command works in DMs also now

## [v1.6.0]

> **Released:** `20-06-2021`

### New features

- New command `follow` - Send news and version updates to a specific channel
- New command `prune` - Prune (delete) messages
- You can use default prefix also after setting custom prefix
- New command `lib` - Find out what library is used to build bot
- New command `coinflip` - The bot will flip the coin for you.
- New command `qrcode` - Generate/Read qrcodes

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
[#34]: https://github.com/Welcome-Bot/welcome-bot/pull/34
[#25]: https://github.com/Welcome-Bot/welcome-bot/pull/25
[#23]: https://github.com/Welcome-Bot/welcome-bot/pull/23
[#20]: https://github.com/Welcome-Bot/welcome-bot/pull/20
[#19]: https://github.com/Welcome-Bot/welcome-bot/issue/19
[#17]: https://github.com/Welcome-Bot/welcome-bot/pull/17
[#13]: https://github.com/Welcome-Bot/welcome-bot/pull/13
[#8]: https://github.com/Welcome-Bot/welcome-bot/pull/8
[#3]: https://github.com/Welcome-Bot/welcome-bot/pull/3
[#6]: https://github.com/Welcome-Bot/welcome-bot/pull/6
[v1.11.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.11.0
[v1.10.3]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.10.3
[v1.10.2]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.10.2
[v1.10.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.10.1
[v1.10.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.10.0
[v1.9.3]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.9.3
[v1.9.2]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.9.2
[v1.9.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.9.1
[v1.9.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.9.0
[v1.8.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.8.0
[v1.7.8]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.8
[v1.7.6]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.6
[v1.7.5]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.5
[v1.7.4]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.4
[v1.7.3]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.3
[v1.7.2]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.2
[v1.7.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.1
[v1.7.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.7.0
[v1.6.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.6.1
[v1.6.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.6.0
[v1.5.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.5.0
[v1.4.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.4.0
[v1.3.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.3.0
[v1.2.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.2.1
[v1.2.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.2.0
[v1.1.1]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.1.1
[v1.1.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.1.0
[v1.0.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v1.0.0

## Legend

- `perms` = `permissions`
- `djs` = `discord.js`

## Older changelogs

- [v0](https://github.com/Welcome-Bot/welcome-bot/blob/v0.1.0/CHANGELOG.md)
