# Table of contents

- [Setup](#setup)
- [General](#general)
- [Information](#information)
- [Manage](#manage)
- [Moderation](#moderation)
- [Miscellaneous](#miscellaneous)
- [Fun](#fun)
- [Anime](#anime)
- [Games](#games)
- [Owner Only](#owner-only)
- [Core](#core)

Welcome-Bot contains more than **20 commands** in **11 categories**!

#### Contents in a command

**Subcommands**: Subcommands to that command if available  
**Name**: The name of the command  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters  
**Aliases**: Duplicate names for this command which can be used.  
**Cooldown**: The time that must elapse between each command so that it can be executed again by the user

## Setup (5 commands)

### `channel`

##### Subcommands:

- `set` - Set Welcome channel
- `setMod` - Set Moderation channel
- `reset` - Reset Welcome channel
- `resetMod` - Reset Moderation channel

##### Info

- Description: Manage channel for this server
Not providing any arguments will display the current settings.
- Usage: None
- Aliases: chan
- Cooldown: 10

### `enable`

##### Subcommands:

- None

##### Info

- Description: Enable/Disable welcome and goodbye logs. Not providing any args will show current settings.
- Usage: [true / false]
- Aliases: None
- Cooldown: 10

### `follow`

##### Subcommands:

- None

##### Info

- Description: Get news and version updates to this bot.
- Usage: [channel / channel id]
- Aliases: getnews
- Cooldown: 10

### `message`

##### Subcommands:

- `set` - Set Welcome message
- `reset` - Reset Welcome message

##### Info

- Description: Manage welcome message for this server
- Usage: None
- Aliases: msg
- Cooldown: 10

### `prefix`

##### Subcommands:

- `set` - Set prefix
- `reset` - Reset prefix

##### Info

- Description: Manage perfix for this server
- Usage: None
- Aliases: None
- Cooldown: 10

## General (3 commands)

### `invite`

##### Subcommands:

- None

##### Info

- Description: Get Invite link for the bot
- Usage: None
- Aliases: None
- Cooldown: 20

### `ping`

##### Subcommands:

- None

##### Info

- Description: Ping the bot
- Usage: None
- Aliases: None
- Cooldown: 5

### `help`

##### Subcommands:

- None

##### Info

- Description: List all of my commands or info about a specific command.
- Usage: (command name)
- Aliases: commands
- Cooldown: 5

## Information (4 commands)

### `botinfo`

##### Subcommands:

- None

##### Info

- Description: Bot information
- Usage: (--dm)
- Aliases: botstats
- Cooldown: 10

### `stats`

##### Subcommands:

- None

##### Info

- Description: Your server statistics
- Usage: (--dm)
- Aliases: server
- Cooldown: 10

### `user`

##### Subcommands:

- None

##### Info

- Description: Get information about a user. It will show your info if no user was mentioned
- Usage: (@mention / user_id)
- Aliases: whois
- Cooldown: 3

### `version`

##### Subcommands:

- None

##### Info

- Description: Information on a version
- Usage: (version)
- Aliases: ver
- Cooldown: 10

## Manage (1 commands)

### `prune`

##### Subcommands:

- `all` - Delete 100 messages
- `bots` - Delete all messages sent by a bot
- `*[string]` - `*Text` will delete any message containing "Text"

##### Info

- Description: Prune messages.
- Usage: [no of msg to prune / subcommand]
- Aliases: None
- Cooldown: 10

## Moderation (3 commands)

### `ban`

##### Subcommands:

- None

##### Info

- Description: Ban a user.
- Usage: [@user] (reason)
- Aliases: None
- Cooldown: 5

### `kick`

##### Subcommands:

- None

##### Info

- Description: Kick a user.
- Usage: [@mention] (reason)
- Aliases: None
- Cooldown: 5

### `unban`

##### Subcommands:

- None

##### Info

- Description: Unban a user.
- Usage: [user_id]
- Aliases: None
- Cooldown: 5

## Miscellaneous (3 commands)

### `uptime`

##### Subcommands:

- None

##### Info

- Description: Get uptime of the bot
- Usage: None
- Aliases: getuptime
- Cooldown: 10

### `qrcode`

##### Subcommands:

- `generate` - Generate a qrcode
- `read` - Read a qrcode

##### Info

- Description: Generate/Read a qrcode
- Usage: [subcommand] [data / image_url]
- Aliases: None
- Cooldown: 10

### `test`

##### Subcommands:

- None

##### Info

- Description: Test welcome message
- Usage: None
- Aliases: None
- Cooldown: 3

## Fun (3 commands)

### `figlet`

##### Subcommands:

- None

##### Info

- Description: Implement the FIGfont spec in JS
- Usage: [string]
- Aliases: asciify, bigtext
- Cooldown: 10

### `image`

##### Subcommands:

- None

##### Info

- Description: Generate a random pokemon image
- Usage: None
- Aliases: randomImage
- Cooldown: 10

### `pokemon`

##### Subcommands:

- None

##### Info

- Description: Get a pokemon image
- Usage: [pokemon character]
- Aliases: pokémon
- Cooldown: 10

## Anime (1 commands)

### `waifu`

##### Subcommands:

- None

##### Info

- Description: Fetches a random waifu (lewd if the channel is NSFW) and displays it.
- Usage: None
- Aliases: None
- Cooldown: 10

## Games (1 commands)

### `coinflip`

##### Subcommands:

- None

##### Info

- Description: Flips a coin.
- Usage: None
- Aliases: cf
- Cooldown: 10

## Owner Only (3 commands)

### `eval`

##### Subcommands:

- None

##### Info

- Description: Execute a statement
- Usage: [statement]
- Aliases: None
- Cooldown: 20

### `reload`

##### Subcommands:

- None

##### Info

- Description: Reloads a command
- Usage: [command]
- Aliases: None
- Cooldown: 30

### `restart`

##### Subcommands:

- None

##### Info

- Description: Restart the bot
- Usage: None
- Aliases: None
- Cooldown: 30

## Core (2 commands)

### `lib`

##### Subcommands:

- None

##### Info

- Description: Library used to build Welcome-Bot
- Usage: None
- Aliases: library
- Cooldown: 10

### `website`

##### Subcommands:

- None

##### Info

- Description: Link to Welcome-Bot's website
- Usage: None
- Aliases: site
- Cooldown: 10

