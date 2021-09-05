Welcome-Bot contains more than **90 commands** in **9 categories**!

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

- [Administration](#administration)
- [Anime](#anime)
- [Core](#core)
- [Economy](#economy)
- [Fun](#fun)
- [General](#general)
- [Image](#image)
- [Moderation](#moderation)
- [Music](#music)



## Administration (13 commands)

### `autopublish`

##### Subcommands:

- `disable` - Disable autopublish
- `enable` - Enable autopublish

##### Cmd info

- Description: Manage autopublish settings
- Usage: t/autopublish (subcommand)
- Aliases: `ap`
- Cooldown: 10

### `autorole`

##### Subcommands:

- `disable` - Disable autorole
- `enable` - Enable autorole
- `set [role id]` - Set autorole

##### Cmd info

- Description: Manage autorole settings
- Usage: t/autorole (subcommand)
- Aliases: `ar`
- Cooldown: 10

### `chatbot`

##### Subcommands:

- `disable` - Disable chatbot
- `enable` - Enable chatbot
- `channel [#channel]` - Set chatbot channel

##### Cmd info

- Description: Manage chatbot settings
- Usage: t/chatbot (subcommand)
- Aliases: `chat`
- Cooldown: 5

### `config`

##### Subcommands:

- None

##### Cmd info

- Description: config.cmdDesc
- Usage: t/config 
- Aliases: `cf`, `configuration`, `conf`
- Cooldown: 10

### `disable`

##### Subcommands:

- `display` - Show current settings

##### Cmd info

- Description: Disable commands.
- Usage: t/disable (command name / subcommand)
- Aliases: None
- Cooldown: 10

### `enable`

##### Subcommands:

- None

##### Cmd info

- Description: Enable commands.
- Usage: t/enable [command name]
- Aliases: None
- Cooldown: 10

### `follow`

##### Subcommands:

- None

##### Cmd info

- Description: Get news and version updates to this bot sent to a specific channel.
- Usage: t/follow [channel / channel id]
- Aliases: `getnews`
- Cooldown: 10

### `goodbye`

##### Subcommands:

- `disable` - Disable goodbye logs
- `enable` - Enable goodbye logs
- `message` - Set goodbye message
- `channel [#channel]` - Set goodbye channel

##### Cmd info

- Description: Manage goodbye logs settings
- Usage: t/goodbye (subcommand)
- Aliases: `goodbyelogs`
- Cooldown: 10

### `lang`

##### Subcommands:

- `list` - List of all languages available
- `set` - Set language

##### Cmd info

- Description: Change language
- Usage: t/lang (subcommand) (lang)
- Aliases: `language`, `changelang`, `getlang`
- Cooldown: 10

### `modlogs`

##### Subcommands:

- `set [#channel]` - Set ModLogs channel

##### Cmd info

- Description: Manage ModLogs settings
- Usage: t/modlogs (subcommand)
- Aliases: `modlog`
- Cooldown: 10

### `prefix`

##### Subcommands:

- `set [prefix]` - Set Custom prefix
- `reset` - Reset Custom prefix

##### Cmd info

- Description: Manage prefix for this server
- Usage: t/prefix (subcommand)
- Aliases: `getprefix`
- Cooldown: 10

### `serverlogs`

##### Subcommands:

- `disable` - Disable server logs
- `enable` - Enable server logs
- `channel [#channel]` - Set server logs channel

##### Cmd info

- Description: Manage server logs settings
- Usage: t/serverlogs (subcommand)
- Aliases: `server-logs`, `logs`
- Cooldown: 10

### `welcome`

##### Subcommands:

- `disable` - Disable welcome logs
- `enable` - Enable welcome logs
- `message` - Set welcome message
- `channel [#channel]` - Set welcome channel

##### Cmd info

- Description: Manage welcome logs settings
- Usage: t/welcome (subcommand)
- Aliases: `welcomelogs`
- Cooldown: 10

## Anime (5 commands)

### `cuddle`

##### Subcommands:

- None

##### Cmd info

- Description: Cuddle with a user
- Usage: t/cuddle [@mention / user id]
- Aliases: None
- Cooldown: 5

### `hug`

##### Subcommands:

- None

##### Cmd info

- Description: Give a hug to a user
- Usage: t/hug [@mention / user id]
- Aliases: None
- Cooldown: 5

### `kiss`

##### Subcommands:

- None

##### Cmd info

- Description: Kiss a user
- Usage: t/kiss [@mention / user id]
- Aliases: None
- Cooldown: 5

### `pat`

##### Subcommands:

- None

##### Cmd info

- Description: Pats someone
- Usage: t/pat [@mention / user id]
- Aliases: None
- Cooldown: 5

### `waifu`

##### Subcommands:

- None

##### Cmd info

- Description: Fetches a random waifu and displays it.
- Usage: t/waifu 
- Aliases: None
- Cooldown: 5

## Core (12 commands)

### `botinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Bot information
- Usage: t/botinfo 
- Aliases: `bi`, `binfo`, `info`, `stats`, `about`
- Cooldown: 5

### `botperms`

##### Subcommands:

- None

##### Cmd info

- Description: List of permissions given to bot
- Usage: t/botperms 
- Aliases: None
- Cooldown: 10

### `invite`

##### Subcommands:

- None

##### Cmd info

- Description: Get Invite link for the bot
- Usage: t/invite 
- Aliases: `invite-bot`, `invitebot`
- Cooldown: 20

### `lib`

##### Subcommands:

- None

##### Cmd info

- Description: Library used to build Welcome-Bot
- Usage: t/lib 
- Aliases: `library`
- Cooldown: 10

### `ping`

##### Subcommands:

- None

##### Cmd info

- Description: Get ping of the bot
- Usage: t/ping 
- Aliases: `latency`, `pong`
- Cooldown: 5

### `report`

##### Subcommands:

- None

##### Cmd info

- Description: Report bugs
- Usage: t/report [bug description]
- Aliases: `report-bug`, `reportbug`
- Cooldown: 10

### `shards`

##### Subcommands:

- None

##### Cmd info

- Description: Shows information about the bot's shards
- Usage: t/shards 
- Aliases: `shard`
- Cooldown: 10

### `suggest`

##### Subcommands:

- None

##### Cmd info

- Description: Give suggestions
- Usage: t/suggest [suggestion description]
- Aliases: `suggestion`
- Cooldown: 10

### `support`

##### Subcommands:

- None

##### Cmd info

- Description: Get Support for Welcome-Bot
- Usage: t/support 
- Aliases: `support-server`, `supportserver`
- Cooldown: 20

### `uptime`

##### Subcommands:

- None

##### Cmd info

- Description: Get uptime of the bot
- Usage: t/uptime 
- Aliases: `bot-uptime`, `botuptime`
- Cooldown: 10

### `vote`

##### Subcommands:

- None

##### Cmd info

- Description: Vote for Welcome-Bot and claim your bonus WCoins (500 WCoins)
- Usage: t/vote 
- Aliases: None
- Cooldown: 10

### `website`

##### Subcommands:

- None

##### Cmd info

- Description: Link to Welcome-Bot's website
- Usage: t/website 
- Aliases: `site`
- Cooldown: 10

## Economy (15 commands)

### `balance`

##### Subcommands:

- None

##### Cmd info

- Description: Check your balance, or someone else's. Shows wallect & bank
- Usage: t/balance 
- Aliases: `bal`, `wallet`
- Cooldown: 5

### `beg`

##### Subcommands:

- None

##### Cmd info

- Description: Get money by begging!
- Usage: t/beg 
- Aliases: None
- Cooldown: 60

### `buy`

##### Subcommands:

- None

##### Cmd info

- Description: Buy items which are available in the shop
- Usage: t/buy [item] (amount)
- Aliases: `purchase`
- Cooldown: 5

### `daily`

##### Subcommands:

- None

##### Cmd info

- Description: Get your daily wcoins!
- Usage: t/daily 
- Aliases: None
- Cooldown: 10

### `deposit`

##### Subcommands:

- `all` - Deposit maximum money, aliases: `max`

##### Cmd info

- Description: Deposit money to your bank
- Usage: t/deposit [coins / subcommand]
- Aliases: `dep`, `bankdep`
- Cooldown: 5

### `gift`

##### Subcommands:

- None

##### Cmd info

- Description: Donate some items to another user
- Usage: t/gift [@mention / user id] [item] (amount)
- Aliases: ``
- Cooldown: 10

### `give`

##### Subcommands:

- None

##### Cmd info

- Description: Donate money to another user
- Usage: t/give [@mention / user id] [amount]
- Aliases: `donate`, `share`
- Cooldown: 5

### `inventory`

##### Subcommands:

- None

##### Cmd info

- Description: Shows yours or some one else's inventory
- Usage: t/inventory 
- Aliases: `inv`
- Cooldown: 10

### `leaderboard`

##### Subcommands:

- None

##### Cmd info

- Description: Shows the leaderboard
- Usage: t/leaderboard 
- Aliases: `top-10`, `rich`, `richest`, `top10`
- Cooldown: 10

### `profile`

##### Subcommands:

- None

##### Cmd info

- Description: Shows your profile or someone else's.
- Usage: t/profile 
- Aliases: `user-profile`, `account`, `userprofile`
- Cooldown: 5

### `rob`

##### Subcommands:

- None

##### Cmd info

- Description: Steal another user's wallet! :dollar:
- Usage: t/rob [@mention]
- Aliases: None
- Cooldown: 60

### `setbio`

##### Subcommands:

- None

##### Cmd info

- Description: Set your Welcome-Bot account's bio!
- Usage: t/setbio [bio]
- Aliases: `bio`
- Cooldown: 10

### `shop`

##### Subcommands:

- None

##### Cmd info

- Description: Shop items
- Usage: t/shop 
- Aliases: `item`, `items`
- Cooldown: 5

### `use`

##### Subcommands:

- None

##### Cmd info

- Description: Use your items
- Usage: t/use [item] (count)
- Aliases: `equip`, `consume`
- Cooldown: 5

### `withdraw`

##### Subcommands:

- `all` - Withdraw all amount from bank: `max`

##### Cmd info

- Description: Withdraw money from your bank
- Usage: t/withdraw [coins / subcommand]
- Aliases: `wd`, `with`
- Cooldown: 10

## Fun (4 commands)

### `8ball`

##### Subcommands:

- None

##### Cmd info

- Description: Get your fortune by asking your question
- Usage: t/8ball [question]
- Aliases: `eight-ball`, `8b`, `8-ball`, `eightball`
- Cooldown: 10

### `coinflip`

##### Subcommands:

- None

##### Cmd info

- Description: Flip a coin.
- Usage: t/coinflip 
- Aliases: `cfp`, `filpcoin`
- Cooldown: 5

### `emojify`

##### Subcommands:

- None

##### Cmd info

- Description: Emojify a text.
- Usage: t/emojify [text]
- Aliases: None
- Cooldown: 8

### `figlet`

##### Subcommands:

- None

##### Cmd info

- Description: Implement the FIGfont spec in JS
- Usage: t/figlet [string]
- Aliases: `asciify`, `bigtext`
- Cooldown: 5

## General (23 commands)

### `addemoji`

##### Subcommands:

- None

##### Cmd info

- Description: Add emoji from a image link
- Usage: t/addemoji [link] [emoji name]
- Aliases: `emoji`
- Cooldown: 10

### `avatar`

##### Subcommands:

- None

##### Cmd info

- Description: Get a user's avatar
- Usage: t/avatar 
- Aliases: `av`
- Cooldown: 10

### `chanid`

##### Subcommands:

- None

##### Cmd info

- Description: Get channel id
- Usage: t/chanid [channel]
- Aliases: `channel-id`, `channelid`
- Cooldown: 5

### `clone`

##### Subcommands:

- None

##### Cmd info

- Description: Clone a text
- Usage: t/clone [text]
- Aliases: `copy`
- Cooldown: 5

### `djsdocs`

##### Subcommands:

- None

##### Cmd info

- Description: Search djs docs
- Usage: t/djsdocs [query] (--source [source])
- Aliases: `djs`
- Cooldown: 10

### `hastebin`

##### Subcommands:

- None

##### Cmd info

- Description: Upload your text on hastebin!
- Usage: t/hastebin [text] (--extension [value])
- Aliases: `pastebin`
- Cooldown: 10

### `help`

##### Subcommands:

- None

##### Cmd info

- Description: List all commands or get info for a specific command/category.
- Usage: t/help (command / category / --list-categories)
- Aliases: `commands`, `cmds`, `ajuda`
- Cooldown: 10

### `listemojis`

##### Subcommands:

- None

##### Cmd info

- Description: List of all custom emojis in this server, with there IDs.
- Usage: t/listemojis 
- Aliases: `list-emojis`
- Cooldown: 10

### `membercount`

##### Subcommands:

- None

##### Cmd info

- Description: Shows the server member count
- Usage: t/membercount 
- Aliases: `mc`, `members`
- Cooldown: 5

### `perms`

##### Subcommands:

- None

##### Cmd info

- Description: Get permissions given to a specific user. Not providing any user mention will show your permissions
- Usage: t/perms (@mention / user id)
- Aliases: `permissions`
- Cooldown: 10

### `qrcode`

##### Subcommands:

- `generate` - Generate a qrcode
- `read` - Read a qrcode

##### Cmd info

- Description: Generate or Read a QR code
- Usage: t/qrcode [subcommand] [text / image url]
- Aliases: `qr`
- Cooldown: 10

### `reminder`

##### Subcommands:

- None

##### Cmd info

- Description: Set a reminder
- Usage: t/reminder [time] (text)
- Aliases: `remind-me`, `remindme`
- Cooldown: 5

### `reverse`

##### Subcommands:

- None

##### Cmd info

- Description: Reverse text
- Usage: t/reverse [text]
- Aliases: `rs`
- Cooldown: 10

### `roleid`

##### Subcommands:

- None

##### Cmd info

- Description: Get role id
- Usage: t/roleid [@role]
- Aliases: `role-id`, `rid`
- Cooldown: 5

### `serverid`

##### Subcommands:

- None

##### Cmd info

- Description: Get server id
- Usage: t/serverid 
- Aliases: `sid`, `guild-id`, `guildid`
- Cooldown: 5

### `serverinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Your server statistics
- Usage: t/serverinfo (--dm)
- Aliases: `si`, `sinfo`
- Cooldown: 5

### `staff`

##### Subcommands:

- None

##### Cmd info

- Description: View this server's staff
- Usage: t/staff 
- Aliases: `server-staff`, `serverstaff`
- Cooldown: 10

### `stealemoji`

##### Subcommands:

- None

##### Cmd info

- Description: Steal emojis from other servers
- Usage: t/stealemoji [emoji]
- Aliases: None
- Cooldown: 5

### `testgoodbye`

##### Subcommands:

- None

##### Cmd info

- Description: Test by sending goodbye message
- Usage: t/testgoodbye 
- Aliases: None
- Cooldown: 10

### `testwelcome`

##### Subcommands:

- None

##### Cmd info

- Description: Test by sending welcome message
- Usage: t/testwelcome 
- Aliases: None
- Cooldown: 10

### `user`

##### Subcommands:

- None

##### Cmd info

- Description: Get information about a user. It will show your info if no user was mentioned
- Usage: t/user (@mention / user id) (--dm)
- Aliases: `whois`, `ui`, `uinfo`
- Cooldown: 10

### `userid`

##### Subcommands:

- None

##### Cmd info

- Description: Get a id of a user
- Usage: t/userid [@user]
- Aliases: `uid`, `user-id`
- Cooldown: 5

### `version`

##### Subcommands:

- None

##### Cmd info

- Description: Get information on a version or latest version
- Usage: t/version (version)
- Aliases: `vinfo`, `ver`
- Cooldown: 10

## Image (2 commands)

### `cat`

##### Subcommands:

- None

##### Cmd info

- Description: Show a random cat image
- Usage: t/cat 
- Aliases: None
- Cooldown: 5

### `duck`

##### Subcommands:

- None

##### Cmd info

- Description: Shows a random duck image
- Usage: t/duck 
- Aliases: None
- Cooldown: 5

## Moderation (6 commands)

### `ban`

##### Subcommands:

- None

##### Cmd info

- Description: Ban a user.
- Usage: t/ban [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `kick`

##### Subcommands:

- None

##### Cmd info

- Description: Kick a user.
- Usage: t/kick [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `mute`

##### Subcommands:

- None

##### Cmd info

- Description: Mute a member
- Usage: t/mute [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

### `prune`

##### Subcommands:

- `all` - Delete 100 messages
- `bots` - Delete all messages sent by a bot in this channel
- `*[string]` - `*Text` will delete any message containing "Text"

##### Cmd info

- Description: Prune Messages. Add a -f option in the end to delete pinned messages also!
- Usage: t/prune 
- Aliases: `purge`
- Cooldown: 10

### `unban`

##### Subcommands:

- None

##### Cmd info

- Description: Unban a user.
- Usage: t/unban 
- Aliases: None
- Cooldown: 10

### `unmute`

##### Subcommands:

- None

##### Cmd info

- Description: Unmute a member
- Usage: t/unmute [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

## Music (8 commands)

### `back`

##### Subcommands:

- None

##### Cmd info

- Description: Play prevoius music
- Usage: t/back 
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
- Usage: t/loop [subcommand]
- Aliases: `setloop`
- Cooldown: 10

### `np`

##### Subcommands:

- None

##### Cmd info

- Description: The details of song which is being played now
- Usage: t/np 
- Aliases: `now-playing`, `nowplaying`
- Cooldown: 10

### `play`

##### Subcommands:

- None

##### Cmd info

- Description: Play music on channel.
You must join a voice channel before using this command.
- Usage: t/play [song name]
- Aliases: `joue`
- Cooldown: 10

### `seek`

##### Subcommands:

- None

##### Cmd info

- Description: Go forward or backward a specific amount of time in the current song!!
- Usage: t/seek [time]
- Aliases: `skip-to`, `skipto`
- Cooldown: 5

### `skip`

##### Subcommands:

- None

##### Cmd info

- Description: Skip the current song
- Usage: t/skip 
- Aliases: `nextmusic`
- Cooldown: 10

### `stop`

##### Subcommands:

- None

##### Cmd info

- Description: Stop the music
- Usage: t/stop 
- Aliases: `leave`
- Cooldown: 10

### `volume`

##### Subcommands:

- None

##### Cmd info

- Description: Adjust the volume of the music
- Usage: t/volume (0-200)
- Aliases: `sound-level`, `soundlevel`
- Cooldown: 10
