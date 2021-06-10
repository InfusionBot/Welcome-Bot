---
layout: docs
---

# Commands - Discord Welcome bot

> Default Prefix: `w/`

If You're not sure what prefix is used can you just `@-mention` the bot (`@welcome-bot#0914`) and it will tell you what prefix is used.

## Setup Commands

### `channel`

Manage channel to send welcome messages and good bye messages

**Subcommands:**
- `set [channel_name]` - Set channel, channel to send message
- `get` - Get currently set channel
- `reset` - Reset channel back to default value

- Usage: `(subcommand)`
- Aliases: `chan`

###  `message`

Manage welcome message

**Subcommands:**
- `set [message]` - Set welcome message
- `get` - Get currently set welcome message
- `reset` - Reset message back to default value

- Usage: `(subcommand)`
- Aliases: `msg`

### `prefix`

Manage prefix for this server

**Subcommands:**
- `set [prefix]` - Set bot prefix
- `get` - Get currently set bot prefix
- `reset` - Reset prefix back to default value

- Usage: `(subcommand)`
- Aliases: `msg`

## Moderation commands

NOTE: `reason` argument will be set to "Not specified" if you don't specify any reason

### `ban`

Ban a user
- Usage: `[@user] (reason)`

### `unban`

Unban a user
- Usage: `[user_id]`

### `kick`

Kick a user
- Usage: `[@user] (reason)`

## General

### `help`

Get help
- Usage: `(command_name)`
- Alias: `commands`

### `ping`

Ping the bot.

## Miscellaneous

### `test`

Test by sending welcome message

### `stats`

Server statistics.

### `user`

Information on a user.
- Usage: `[@mention || user_id]`
- Aliases: `whois`

### `info`

Information about the bot.

- - -

The brakets in these commands mean:
```
[] = Required argument
() = Optional argument
|| = This OR That
```

All these commands should be prefixed with prefix i.e. for command `ping` you have to send `w/ping` in the channel the bot has perms to read and send messages.

In some of these you will see under a command their is a command, to execute those, send `command subcommand args` where `command` is the command, `subcommand` is the subcommand and `args` is/are the argument(s)

Example usage of subcommand: `w/message set Welcome {mention}!`

- - -

## Placeholders in welcome message
There are some placeholders you can use in the welcome message which will be replaced by their values by the bot.

Example: `{server}` will be replaced by the server's name

Available placeholders:
- `{server}` - The server's name
- `{mention}` - @-mention the user who has joined.
- `{members}` - The number of the member, took from members count in the server, i.e "If their were 8 members and a new member joins, he is our 9th member!"
