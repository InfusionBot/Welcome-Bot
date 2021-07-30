# Changelog v2

The Changelog of the major version 2 of Discord Welcome-Bot.

The displayed date is in the format `DD-MM-YYYY`

[Older changelogs](#older-changelogs)

[Legend](#legend)

## [v2.0.0]

> **Released:** `TBA`

### Breaking Changes

- fix(goodbye): They are disabled by default now!
- Default welcome message is changed to `Welcome {mention} to the {server} server!\nYou are our #{members_formatted} member`
- Default goodbye message is changed to `Good Bye {mention}!\nWe are sad to see you go!\nWithout you, we are {{members}} members`

### Bug fixes

- fix(channel): fix error `ReferenceError: channelIdFromMention is not defined`
- fix(goodbye): Sometimes, an error would occur to send goodbye logs
- fix(lang): after switching another language, an error occures when you try to switch back to english

### New features

- feat: New cmd `emojify`
- feat: New cmd `daily` and new category `Economy`
- feat: New cmd `balance`
- feat: New cmd `deposit`
- feat: New cmd `give`
- feat: New cmd `beg`
- feat: New cmd `withdraw`
- feat: New cmd `profile`
- feat: New cmd `setbio`
- feat: New cmd `rob`
- feat: New cmd `vote`
- feat: New cmd `report`
- feat: New cmd `duck`
- feat: add `{username}`, `{members_formatted}` placeholders for welcome & goodbye messages

### Changes

- refactor(goodbye logs): Goodbye logs now use embeds!
- refactor(disable cmd): disable commands using disable cmd!
- refactor(enable): enable commands using enable cmd!
- refactor(translations): Lot more translations

[v2.0.0]: https://github.com/Welcome-Bot/welcome-bot/releases/tag/v2.0.0

## Legend

- `perms` = `permissions`
- `djs` = `discord.js`

## Older changelogs

- [v1](https://github.com/Welcome-Bot/welcome-bot/blob/v1.13.2/CHANGELOG.md)
- [v0](https://github.com/Welcome-Bot/welcome-bot/blob/v0.1.0/CHANGELOG.md)
