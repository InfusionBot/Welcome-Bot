Welcome-Bot contains more than **100 commands** in **9 categories**!

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
- Usage: w/autopublish (subcommand)
- Aliases: `ap`
- Cooldown: 5

### `autorole`

##### Subcommands:

- `disable` - Disable autorole
- `enable` - Enable autorole
- `set [role id]` - Set autorole

##### Cmd info

- Description: Manage autorole settings
- Usage: w/autorole (subcommand)
- Aliases: `ar`
- Cooldown: 5

### `chatbot`

##### Subcommands:

- `disable` - Disable chatbot
- `enable` - Enable chatbot
- `channel [#channel]` - Set chatbot channel

##### Cmd info

- Description: Manage chatbot settings
- Usage: w/chatbot (subcommand)
- Aliases: `chat`
- Cooldown: 5

### `config`

##### Subcommands:

- None

##### Cmd info

- Description: See current configuration
- Usage: w/config 
- Aliases: `cf`, `configuration`, `conf`
- Cooldown: 5

### `disable`

##### Subcommands:

- `display` - Show current settings

##### Cmd info

- Description: Disable commands.
- Usage: w/disable (command name / subcommand)
- Aliases: None
- Cooldown: 5

### `enable`

##### Subcommands:

- None

##### Cmd info

- Description: Enable commands.
- Usage: w/enable [command name]
- Aliases: None
- Cooldown: 5

### `follow`

##### Subcommands:

- None

##### Cmd info

- Description: Get news and version updates to this bot sent to a specific channel.
- Usage: w/follow [channel / channel id]
- Aliases: `getnews`
- Cooldown: 5

### `goodbye`

##### Subcommands:

- `disable` - Disable goodbye logs
- `enable` - Enable goodbye logs
- `message` - Set goodbye message
- `channel [#channel]` - Set goodbye channel

##### Cmd info

- Description: Manage goodbye logs settings
- Usage: w/goodbye (subcommand)
- Aliases: `goodbyelogs`
- Cooldown: 5

### `lang`

##### Subcommands:

- `list` - List of all languages available
- `set` - Set language

##### Cmd info

- Description: Change language
- Usage: w/lang (subcommand) (lang)
- Aliases: `language`, `changelang`, `getlang`
- Cooldown: 5

### `modlogs`

##### Subcommands:

- `set [#channel]` - Set ModLogs channel

##### Cmd info

- Description: Manage ModLogs settings
- Usage: w/modlogs (subcommand)
- Aliases: `modlog`
- Cooldown: 5

### `prefix`

##### Subcommands:

- `set [prefix]` - Set Custom prefix
- `reset` - Reset Custom prefix

##### Cmd info

- Description: Manage prefix for this server
- Usage: w/prefix (subcommand)
- Aliases: `getprefix`
- Cooldown: 5

### `serverlogs`

##### Subcommands:

- `disable` - Disable server logs
- `enable` - Enable server logs
- `channel [#channel]` - Set server logs channel

##### Cmd info

- Description: Manage server logs settings
- Usage: w/serverlogs (subcommand)
- Aliases: `server-logs`, `logs`
- Cooldown: 5

### `welcome`

##### Subcommands:

- `disable` - Disable welcome logs
- `enable` - Enable welcome logs
- `message` - Set welcome message
- `channel [#channel]` - Set welcome channel

##### Cmd info

- Description: Manage welcome logs settings
- Usage: w/welcome (subcommand)
- Aliases: `welcomelogs`
- Cooldown: 5

## Anime (7 commands)

### `cuddle`

##### Subcommands:

- None

##### Cmd info

- Description: Cuddle with a user
- Usage: w/cuddle [@mention / user id]
- Aliases: None
- Cooldown: 5

### `hug`

##### Subcommands:

- None

##### Cmd info

- Description: Give a hug to a user
- Usage: w/hug [@mention / user id]
- Aliases: None
- Cooldown: 5

### `kiss`

##### Subcommands:

- None

##### Cmd info

- Description: Kiss a user
- Usage: w/kiss [@mention / user id]
- Aliases: None
- Cooldown: 5

### `pat`

##### Subcommands:

- None

##### Cmd info

- Description: Pats someone
- Usage: w/pat [@mention / user id]
- Aliases: None
- Cooldown: 5

### `slap`

##### Subcommands:

- None

##### Cmd info

- Description: Slap a user
- Usage: w/slap [@mention / user id]
- Aliases: None
- Cooldown: 5

### `tickle`

##### Subcommands:

- None

##### Cmd info

- Description: Tickle a user
- Usage: w/tickle [@mention / user id]
- Aliases: None
- Cooldown: 5

### `waifu`

##### Subcommands:

- None

##### Cmd info

- Description: Fetches a random waifu and displays it.
- Usage: w/waifu 
- Aliases: None
- Cooldown: 5

## Core (16 commands)

### `botinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Bot information
- Usage: w/botinfo 
- Aliases: `bi`, `binfo`, `info`, `stats`, `about`
- Cooldown: 5

### `botperms`

##### Subcommands:

- None

##### Cmd info

- Description: List of permissions given to bot
- Usage: w/botperms 
- Aliases: None
- Cooldown: 10

### `donate`

##### Subcommands:

- None

##### Cmd info

- Description: Donate to get premium perks!
- Usage: w/donate 
- Aliases: `premium`
- Cooldown: 5

### `invite`

##### Subcommands:

- None

##### Cmd info

- Description: Get Invite link for the bot
- Usage: w/invite 
- Aliases: `invite-bot`, `invitebot`
- Cooldown: 20

### `lib`

##### Subcommands:

- None

##### Cmd info

- Description: Library used to build Welcome-Bot
- Usage: w/lib 
- Aliases: `library`
- Cooldown: 10

### `ping`

##### Subcommands:

- None

##### Cmd info

- Description: Get ping of the bot
- Usage: w/ping 
- Aliases: `latency`, `pong`
- Cooldown: 5

### `premiumcode`

##### Subcommands:

- None

##### Cmd info

- Description: Get info on a premium code
- Usage: w/premiumcode [code]
- Aliases: ``
- Cooldown: 5

### `report`

##### Subcommands:

- None

##### Cmd info

- Description: Report bugs
- Usage: w/report [bug description]
- Aliases: `report-bug`, `reportbug`
- Cooldown: 10

### `shards`

##### Subcommands:

- None

##### Cmd info

- Description: Shows information about the bot's shards
- Usage: w/shards 
- Aliases: `shard`
- Cooldown: 10

### `sourcecode`

##### Subcommands:

- None

##### Cmd info

- Description: Link to Welcome-Bot's source code
- Usage: w/sourcecode 
- Aliases: `source`
- Cooldown: 5

### `suggest`

##### Subcommands:

- None

##### Cmd info

- Description: Give suggestions
- Usage: w/suggest [suggestion description]
- Aliases: `suggestion`
- Cooldown: 10

### `support`

##### Subcommands:

- None

##### Cmd info

- Description: Get Support for Welcome-Bot
- Usage: w/support 
- Aliases: `support-server`, `supportserver`
- Cooldown: 20

### `uptime`

##### Subcommands:

- None

##### Cmd info

- Description: Get uptime of the bot
- Usage: w/uptime 
- Aliases: `bot-uptime`, `botuptime`
- Cooldown: 10

### `usecode`

##### Subcommands:

- None

##### Cmd info

- Description: Redeem a premium code
- Usage: w/usecode [code]
- Aliases: `use-code`
- Cooldown: 5

### `vote`

##### Subcommands:

- None

##### Cmd info

- Description: Vote for Welcome-Bot and claim your bonus WCoins (500 WCoins)
- Usage: w/vote 
- Aliases: None
- Cooldown: 5

### `website`

##### Subcommands:

- None

##### Cmd info

- Description: Link to Welcome-Bot's website
- Usage: w/website 
- Aliases: `site`
- Cooldown: 10

## Economy (16 commands)

### `balance`

##### Subcommands:

- None

##### Cmd info

- Description: Check your balance, or someone else's. Shows wallect & bank
- Usage: w/balance 
- Aliases: `bal`, `wallet`
- Cooldown: 5

### `beg`

##### Subcommands:

- None

##### Cmd info

- Description: Get money by begging!
- Usage: w/beg 
- Aliases: None
- Cooldown: 60

### `buy`

##### Subcommands:

- None

##### Cmd info

- Description: Buy items which are available in the shop
- Usage: w/buy [item] (amount)
- Aliases: `purchase`
- Cooldown: 5

### `daily`

##### Subcommands:

- None

##### Cmd info

- Description: Get your daily wcoins!
- Usage: w/daily 
- Aliases: None
- Cooldown: 10

### `deposit`

##### Subcommands:

- `all` - Deposit maximum money, aliases: `max`

##### Cmd info

- Description: Deposit money to your bank
- Usage: w/deposit [coins / subcommand]
- Aliases: `dep`, `bankdep`
- Cooldown: 5

### `gift`

##### Subcommands:

- None

##### Cmd info

- Description: Donate some items to another user
- Usage: w/gift [@mention / user id] [item] (amount)
- Aliases: ``
- Cooldown: 10

### `give`

##### Subcommands:

- None

##### Cmd info

- Description: Donate money to another user
- Usage: w/give [@mention / user id] [amount]
- Aliases: `share`
- Cooldown: 5

### `inventory`

##### Subcommands:

- None

##### Cmd info

- Description: Shows yours or some one else's inventory
- Usage: w/inventory 
- Aliases: `inv`
- Cooldown: 10

### `leaderboard`

##### Subcommands:

- None

##### Cmd info

- Description: Shows the leaderboard
- Usage: w/leaderboard 
- Aliases: `top-10`, `rich`, `richest`, `top10`
- Cooldown: 10

### `profile`

##### Subcommands:

- None

##### Cmd info

- Description: Shows your profile or someone else's.
- Usage: w/profile 
- Aliases: `user-profile`, `account`, `userprofile`
- Cooldown: 5

### `rob`

##### Subcommands:

- None

##### Cmd info

- Description: Steal another user's wallet! :dollar:
- Usage: w/rob [@mention]
- Aliases: None
- Cooldown: 30

### `setbio`

##### Subcommands:

- None

##### Cmd info

- Description: Set your Welcome-Bot account's bio!
- Usage: w/setbio [bio]
- Aliases: `bio`
- Cooldown: 10

### `shop`

##### Subcommands:

- None

##### Cmd info

- Description: Shop items
- Usage: w/shop 
- Aliases: `item`, `items`
- Cooldown: 5

### `use`

##### Subcommands:

- None

##### Cmd info

- Description: Use your items
- Usage: w/use [item] (count)
- Aliases: `equip`, `consume`
- Cooldown: 5

### `weekly`

##### Subcommands:

- None

##### Cmd info

- Description: Get your weekly wcoins!
- Usage: w/weekly 
- Aliases: None
- Cooldown: 10

### `withdraw`

##### Subcommands:

- `all` - Withdraw all amount from bank: `max`

##### Cmd info

- Description: Withdraw money from your bank
- Usage: w/withdraw [coins / subcommand]
- Aliases: `wd`, `with`
- Cooldown: 10

## Fun (5 commands)

### `8ball`

##### Subcommands:

- None

##### Cmd info

- Description: Get your fortune by asking your question
- Usage: w/8ball [question]
- Aliases: `eight-ball`, `8b`, `8-ball`, `eightball`
- Cooldown: 10

### `coinflip`

##### Subcommands:

- None

##### Cmd info

- Description: Flip a coin.
- Usage: w/coinflip 
- Aliases: `cfp`, `filpcoin`
- Cooldown: 5

### `emojify`

##### Subcommands:

- None

##### Cmd info

- Description: Emojify a text.
- Usage: w/emojify [text]
- Aliases: None
- Cooldown: 8

### `figlet`

##### Subcommands:

- None

##### Cmd info

- Description: Implement the FIGfont spec in JS
- Usage: w/figlet [string]
- Aliases: `asciify`, `bigtext`
- Cooldown: 5

### `randomnumber`

##### Subcommands:

- None

##### Cmd info

- Description: Generates a random number
- Usage: w/randomnumber (max)
- Aliases: `random`
- Cooldown: 5

## General (24 commands)

### `addemoji`

##### Subcommands:

- None

##### Cmd info

- Description: Add emoji from a image link
- Usage: w/addemoji [link] [emoji name]
- Aliases: `emoji`
- Cooldown: 10

### `avatar`

##### Subcommands:

- None

##### Cmd info

- Description: Get a user's avatar
- Usage: w/avatar 
- Aliases: `av`
- Cooldown: 10

### `chanid`

##### Subcommands:

- None

##### Cmd info

- Description: Get channel id
- Usage: w/chanid [channel]
- Aliases: `channel-id`, `channelid`
- Cooldown: 5

### `clone`

##### Subcommands:

- None

##### Cmd info

- Description: Clone a text
- Usage: w/clone [text]
- Aliases: `copy`
- Cooldown: 5

### `djsdocs`

##### Subcommands:

- None

##### Cmd info

- Description: Search djs docs
- Usage: w/djsdocs [query] (--source [source])
- Aliases: `djs`
- Cooldown: 5

### `hastebin`

##### Subcommands:

- None

##### Cmd info

- Description: Upload your text on hastebin!
- Usage: w/hastebin [text] (--extension [value])
- Aliases: `pastebin`
- Cooldown: 10

### `help`

##### Subcommands:

- None

##### Cmd info

- Description: List all commands or get info for a specific command/category.
- Usage: w/help (command / category / --list-categories)
- Aliases: `commands`, `cmds`, `ajuda`
- Cooldown: 10

### `listemojis`

##### Subcommands:

- None

##### Cmd info

- Description: List of all custom emojis in this server, with there IDs.
- Usage: w/listemojis 
- Aliases: `list-emojis`
- Cooldown: 10

### `membercount`

##### Subcommands:

- None

##### Cmd info

- Description: Shows the server member count
- Usage: w/membercount 
- Aliases: `mc`, `members`
- Cooldown: 5

### `perms`

##### Subcommands:

- None

##### Cmd info

- Description: Get permissions given to a specific user. Not providing any user mention will show your permissions
- Usage: w/perms (@mention / user id)
- Aliases: `permissions`
- Cooldown: 10

### `qrcode`

##### Subcommands:

- `generate` - Generate a qrcode
- `read` - Read a qrcode

##### Cmd info

- Description: Generate or Read a QR code
- Usage: w/qrcode [subcommand] [text / image url]
- Aliases: `qr`
- Cooldown: 10

### `reminder`

##### Subcommands:

- None

##### Cmd info

- Description: Set a reminder
- Usage: w/reminder [time] (text)
- Aliases: `remind-me`, `remindme`
- Cooldown: 5

### `reverse`

##### Subcommands:

- None

##### Cmd info

- Description: Reverse text
- Usage: w/reverse [text]
- Aliases: `rs`
- Cooldown: 10

### `roleid`

##### Subcommands:

- None

##### Cmd info

- Description: Get role id
- Usage: w/roleid [@role]
- Aliases: `role-id`, `rid`
- Cooldown: 5

### `screenshot`

##### Subcommands:

- None

##### Cmd info

- Description: Take a screenshot
- Usage: w/screenshot [site]
- Aliases: `ss`
- Cooldown: 5

### `serverid`

##### Subcommands:

- None

##### Cmd info

- Description: Get server id
- Usage: w/serverid 
- Aliases: `sid`, `guild-id`, `guildid`
- Cooldown: 5

### `serverinfo`

##### Subcommands:

- None

##### Cmd info

- Description: Your server statistics
- Usage: w/serverinfo (--dm)
- Aliases: `si`, `sinfo`
- Cooldown: 5

### `snipe`

##### Subcommands:

- None

##### Cmd info

- Description: Shows the last deleted message from a specified channel!
- Usage: w/snipe (#channel)
- Aliases: ``
- Cooldown: 5

### `staff`

##### Subcommands:

- None

##### Cmd info

- Description: View this server's staff
- Usage: w/staff 
- Aliases: `server-staff`, `serverstaff`
- Cooldown: 10

### `stealemoji`

##### Subcommands:

- None

##### Cmd info

- Description: Steal emojis from other servers
- Usage: w/stealemoji [emoji]
- Aliases: None
- Cooldown: 5

### `testgoodbye`

##### Subcommands:

- None

##### Cmd info

- Description: Test by sending goodbye message
- Usage: w/testgoodbye 
- Aliases: None
- Cooldown: 10

### `testwelcome`

##### Subcommands:

- None

##### Cmd info

- Description: Test by sending welcome message
- Usage: w/testwelcome 
- Aliases: None
- Cooldown: 10

### `user`

##### Subcommands:

- None

##### Cmd info

- Description: Get information about a user. It will show your info if no user was mentioned
- Usage: w/user (@mention / user id) (--dm)
- Aliases: `whois`, `ui`, `uinfo`, `userinfo`
- Cooldown: 10

### `userid`

##### Subcommands:

- None

##### Cmd info

- Description: Get a id of a user
- Usage: w/userid [@user]
- Aliases: `uid`, `user-id`
- Cooldown: 5

## Image (2 commands)

### `cat`

##### Subcommands:

- None

##### Cmd info

- Description: Show a random cat image
- Usage: w/cat 
- Aliases: None
- Cooldown: 5

### `duck`

##### Subcommands:

- None

##### Cmd info

- Description: Shows a random duck image
- Usage: w/duck 
- Aliases: None
- Cooldown: 5

## Moderation (9 commands)

### `ban`

##### Subcommands:

- None

##### Cmd info

- Description: Ban a user.
- Usage: w/ban [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `dehoist`

##### Subcommands:

- `list` - List all members who are hoisting

##### Cmd info

- Description: Dehoist users that are trying to hoist
- Usage: w/dehoist 
- Aliases: `deh`
- Cooldown: 5

### `kick`

##### Subcommands:

- None

##### Cmd info

- Description: Kick a user.
- Usage: w/kick [@mention] (reason)
- Aliases: None
- Cooldown: 10

### `lock`

##### Subcommands:

- None

##### Cmd info

- Description: Lock current channel
- Usage: w/lock 
- Aliases: `lock-channel`, `lockchannel`
- Cooldown: 5

### `mute`

##### Subcommands:

- None

##### Cmd info

- Description: Mute a member
- Usage: w/mute [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

### `prune`

##### Subcommands:

- `all` - Delete 100 messages
- `bots` - Delete all messages sent by a bot in this channel
- `*[string]` - `*Text` will delete any message containing "Text"

##### Cmd info

- Description: Prune Messages. Add a -f option in the end to delete pinned messages also!
- Usage: w/prune 
- Aliases: `purge`, `clear`
- Cooldown: 10

### `unban`

##### Subcommands:

- None

##### Cmd info

- Description: Unban a user.
- Usage: w/unban 
- Aliases: None
- Cooldown: 10

### `unlock`

##### Subcommands:

- None

##### Cmd info

- Description: Unlock current channel
- Usage: w/unlock 
- Aliases: `unlock-channel`, `unlockchannel`
- Cooldown: 5

### `unmute`

##### Subcommands:

- None

##### Cmd info

- Description: Unmute a member
- Usage: w/unmute [@mention / user id] (reason)
- Aliases: None
- Cooldown: 10

## Music (9 commands)

### `247`

##### Subcommands:

- None

##### Cmd info

- Description: Disables leaving channel after queue finishes.
- Usage: w/247 
- Aliases: `24/7`
- Cooldown: 5

### `back`

##### Subcommands:

- None

##### Cmd info

- Description: Play prevoius music
- Usage: w/back 
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
- Usage: w/loop [subcommand]
- Aliases: `setloop`
- Cooldown: 10

### `np`

##### Subcommands:

- None

##### Cmd info

- Description: The details of song which is being played now
- Usage: w/np 
- Aliases: `now-playing`, `nowplaying`
- Cooldown: 10

### `play`

##### Subcommands:

- None

##### Cmd info

- Description: Play music on voice / stage channel.
- Usage: w/play [song name]
- Aliases: `joue`
- Cooldown: 5

### `seek`

##### Subcommands:

- None

##### Cmd info

- Description: Go forward or backward a specific amount of time in the current song!!
- Usage: w/seek [time]
- Aliases: `skip-to`, `skipto`
- Cooldown: 5

### `skip`

##### Subcommands:

- None

##### Cmd info

- Description: Skip the current song
- Usage: w/skip 
- Aliases: `nextmusic`
- Cooldown: 10

### `stop`

##### Subcommands:

- None

##### Cmd info

- Description: Stop the music
- Usage: w/stop 
- Aliases: `leave`
- Cooldown: 10

### `volume`

##### Subcommands:

- None

##### Cmd info

- Description: Adjust the volume of the music
- Usage: w/volume (0-200)
- Aliases: `sound-level`, `soundlevel`
- Cooldown: 5
