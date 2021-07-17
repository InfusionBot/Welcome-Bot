Welcome-Bot contains more than **50 commands** in **8 categories**!

### **Usage Key!**

- The `[` and `]` around the argument mean it’s required.  
- The `(` and `)` around the argument mean it’s optional.

#### Contents in a command

**Name**: The name of the command  
**Subcommands**: Subcommands to that command if available  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters  
**Aliases**: Duplicate names for this command which can be used.  
**Cooldown**: The time that must elapse between each command so that it can be executed again by the user

# Table of contents

- [Setup](#setup)
- [General](#general)
- [Moderation](#moderation)
- [Fun](#fun)
- [Music](#music)
- [Anime](#anime)
- [Owner Only](#owner-only)
- [Core](#core)



## Setup (7 commands)

### `channel`

##### Subcommands:

- `set` - Set Welcome channel
- `setMod` - Set Moderation channel
- `reset` - Reset Welcome channel
- `resetMod` - Reset Moderation channel

##### Cmd info

- Description: Manage channel settings for this server
Not providing any arguments will display the current settings.
- Usage: (subcommand)
- Aliases: `chan`
- Cooldown: 10

### `disable`

##### Subcommands:

- `welcome` - Disable welcome logs
- `goodbye` - Disable goodBye logs
- `show` - Show current settings

##### Cmd info

- Description: Disable welcome and goodbye logs.
- Usage: [subcommand]
- Aliases: None
- Cooldown: 10

### `enable`

##### Subcommands:

- `welcome` - Enable welcome logs
- `goodbye` - Enable goodBye logs
- `show` - Show current settings

##### Cmd info

- Description: Enable welcome and goodbye logs.
- Usage: [subcommand]
- Aliases: None
- Cooldown: 10

### `follow`

##### Subcommands:

- None

##### Cmd info

- Description: Get news and version updates to this bot sent to a specific channel.
- Usage: [channel / channel id]
- Aliases: `getnews`
- Cooldown: 10

### `lang`

##### Subcommands:

- `list` - List of all languages available
- `set` - Set language

##### Cmd info

- Description: Change language
- Usage: (subcommand) (lang)
- Aliases: `language`, `changelang`, `getlang`
- Cooldown: 10

### `message`

##### Subcommands:

- `set` - Set Welcome message
- `reset` - Reset Welcome message

##### Cmd info

- Description: Manage welcome message for this server
- Usage: (subcommand)
- Aliases: `msg`
- Cooldown: 10

### `prefix`

##### Subcommands:

- `set` - Set Custom prefix
- `reset` - Reset Custom prefix

##### Cmd info

- Description: Manage prefix for this server
- Usage: (subcommand)
- Aliases: `getprefix`
- Cooldown: 10

## General (11 commands)

### `addemoji`

##### Subcommands:

- None

##### Cmd info

- Description: Add emoji from a image link
- Usage: [link] [emoji name]
- Aliases: `emoji`
- Cooldown: 10

### `avatar`

##### Subcommands:

- None

##### Cmd info

- Description: Get a user's avatar
- Usage: (@mention / user id)
- Aliases: `dp`, `profile`
- Cooldown: 10

### `hastebin`

##### Subcommands:

- None

##### Cmd info

- Description: Upload your text on hastebin!
- Usage: [text]
- Aliases: `pastebin`
- Cooldown: 10

### `help`

##### Subcommands:

- None

##### Cmd info

- Description: List all commands or get info for a specific command/category.
- Usage: (command name / category / --list-categories)
- Aliases: `commands`, `cmds`, `ajuda`
- Cooldown: 10

### `listemojis`

##### Subcommands:

- None

##### Cmd info

- Description: List of all custom emojis in this server, with there IDs.
- Usage: None
- Aliases: `list-emojis`
- Cooldown: 10

### `perms`

##### Subcommands:

- None

##### Cmd info

- Description: Get permissions given to a specific user. Not providing any user mention will show your permissions
- Usage: (@mention / user id)
- Aliases: `permissions`
- Cooldown: 10

### `qrcode`

##### Subcommands:

- `generate` - Generate a qrcode
- `read` - Read a qrcode

##### Cmd info

- Description: Generate or Read a QR code
- Usage: [subcommand] [data / image_url]
- Aliases: `qr`
- Cooldown: 10

### `serverinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Your server statistics
- Usage: (--dm)
- Aliases: `si`
- Cooldown: 10

### `test`

##### Subcommands:

- None

##### Cmd info

- Description: Test by sending welcome message
- Usage: None
- Aliases: None
- Cooldown: 10

### `user`

##### Subcommands:

- None

##### Cmd info

- Description: Get information about a user. It will show your info if no user was mentioned
- Usage: (@mention / user id) (--dm)
- Aliases: `whois`, `ui`, `uinfo`
- Cooldown: 10

### `version`

##### Subcommands:

- None

##### Cmd info

- Description: Get information on a version or latest version
- Usage: (version)
- Aliases: `vinfo`, `ver`
- Cooldown: 10

## Moderation (6 commands)

### `ban`

##### Subcommands:

- None

##### Cmd info

- Description: Ban a user.
- Usage: [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `kick`

##### Subcommands:

- None

##### Cmd info

- Description: Kick a user.
- Usage: [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `mute`

##### Subcommands:

- None

##### Cmd info

- Description: Mute a member
- Usage: [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

### `prune`

##### Subcommands:

- `all` - Delete 100 messages
- `bots` - Delete all messages sent by a bot in this channel
- `*[string]` - `*Text` will delete any message containing "Text"

##### Cmd info

- Description: Prune Messages.
- Usage: [no of msg / subcommand]
- Aliases: `purge`
- Cooldown: 10

### `unban`

##### Subcommands:

- None

##### Cmd info

- Description: Unban a user.
- Usage: [user id]
- Aliases: None
- Cooldown: 10

### `unmute`

##### Subcommands:

- None

##### Cmd info

- Description: Unmute a member
- Usage: [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

## Fun (5 commands)

### `8ball`

##### Subcommands:

- None

##### Cmd info

- Description: Get your fortune by asking your question
- Usage: [question]
- Aliases: `eight-ball`, `8b`, `8-ball`, `eightball`
- Cooldown: 10

### `coinflip`

##### Subcommands:

- None

##### Cmd info

- Description: Flip a coin.
- Usage: None
- Aliases: `cf`, `filpcoin`
- Cooldown: 10

### `figlet`

##### Subcommands:

- None

##### Cmd info

- Description: Implement the FIGfont spec in JS
- Usage: [string]
- Aliases: `asciify`, `bigtext`
- Cooldown: 10

### `image`

##### Subcommands:

- None

##### Cmd info

- Description: Generate a random pokemon image
- Usage: None
- Aliases: `random-image`, `randomimage`
- Cooldown: 10

### `pokemon`

##### Subcommands:

- None

##### Cmd info

- Description: Get a pokemon image
- Usage: [pokemon character]
- Aliases: `pokémon`
- Cooldown: 10

## Music (7 commands)

### `back`

##### Subcommands:

- None

##### Cmd info

- Description: Play prevoius music
- Usage: None
- Aliases: `prevoius`
- Cooldown: 10

### `loop`

##### Subcommands:

- `off` - Turn off loop mode and don't autoplay also
- `track` - Enable loop of current track
- `queue` - Enable loop of current queue
- `autoplay` - Just keep playing next songs in queue and end when queue finishes

##### Cmd info

- Description: Manage loop settings for music
- Usage: [subcommand]
- Aliases: `setloop`
- Cooldown: 10

### `np`

##### Subcommands:

- None

##### Cmd info

- Description: The details of song which is being played now
- Usage: None
- Aliases: `now-playing`, `nowplaying`
- Cooldown: 10

### `play`

##### Subcommands:

- None

##### Cmd info

- Description: Play music on channel.
You must join a voice channel before using this command.
- Usage: [name]
- Aliases: `joue`
- Cooldown: 10

### `skip`

##### Subcommands:

- None

##### Cmd info

- Description: Skip the current song
- Usage: None
- Aliases: `nextmusic`
- Cooldown: 10

### `stop`

##### Subcommands:

- None

##### Cmd info

- Description: Stop the music
- Usage: None
- Aliases: `leave`
- Cooldown: 10

### `volume`

##### Subcommands:

- None

##### Cmd info

- Description: Adjust the volume of the music
- Usage: (0-200)
- Aliases: `sound-level`, `soundlevel`
- Cooldown: 10

## Anime (5 commands)

### `cuddle`

##### Subcommands:

- None

##### Cmd info

- Description: Cuddle with a user
- Usage: [@mention / user id]
- Aliases: None
- Cooldown: 5

### `hug`

##### Subcommands:

- None

##### Cmd info

- Description: Give a hug to a user
- Usage: [@mention / user id]
- Aliases: None
- Cooldown: 5

### `kiss`

##### Subcommands:

- None

##### Cmd info

- Description: Kiss a user
- Usage: [@mention / user id]
- Aliases: None
- Cooldown: 5

### `pat`

##### Subcommands:

- None

##### Cmd info

- Description: Pats someone
- Usage: [@mention / user id]
- Aliases: None
- Cooldown: 5

### `waifu`

##### Subcommands:

- None

##### Cmd info

- Description: Fetches a random waifu and displays it.
- Usage: None
- Aliases: None
- Cooldown: 5

## Owner Only (4 commands)

### `eval`

##### Subcommands:

- None

##### Cmd info

- Description: Execute a JS statement.
- Usage: [statement]
- Aliases: None
- Cooldown: 20

### `reload`

##### Subcommands:

- None

##### Cmd info

- Description: Reloads a command
- Usage: [command]
- Aliases: None
- Cooldown: 30

### `restart`

##### Subcommands:

- None

##### Cmd info

- Description: Restart the bot
- Usage: None
- Aliases: None
- Cooldown: 30

### `servers-list`

##### Subcommands:

- None

##### Cmd info

- Description: Show the list of servers the bot is in.
- Usage: None
- Aliases: `slist`, `serverslist`
- Cooldown: 20

## Core (9 commands)

### `botinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Bot information
- Usage: (--dm)
- Aliases: `bi`, `binfo`, `info`, `stats`
- Cooldown: 5

### `botperms`

##### Subcommands:

- None

##### Cmd info

- Description: List of permissions given to bot
- Usage: None
- Aliases: None
- Cooldown: 10

### `invite`

##### Subcommands:

- None

##### Cmd info

- Description: Get Invite link for the bot
- Usage: None
- Aliases: `invite-bot`, `invitebot`
- Cooldown: 20

### `lib`

##### Subcommands:

- None

##### Cmd info

- Description: Library used to build Welcome-Bot
- Usage: None
- Aliases: `library`
- Cooldown: 10

### `ping`

##### Subcommands:

- None

##### Cmd info

- Description: Ping the bot
- Usage: None
- Aliases: `latency`, `pong`
- Cooldown: 5

### `suggest`

##### Subcommands:

- None

##### Cmd info

- Description: Give your suggestion
- Usage: [suggestion]
- Aliases: `suggestion`
- Cooldown: 10

### `support`

##### Subcommands:

- None

##### Cmd info

- Description: Get Support for Welcome-Bot
- Usage: None
- Aliases: `support-server`, `supportserver`
- Cooldown: 20

### `uptime`

##### Subcommands:

- None

##### Cmd info

- Description: Get uptime of the bot
- Usage: None
- Aliases: `bot-uptime`, `botuptime`
- Cooldown: 10

### `website`

##### Subcommands:

- None

##### Cmd info

- Description: Link to Welcome-Bot's website
- Usage: None
- Aliases: `site`
- Cooldown: 10
