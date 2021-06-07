# Commands - Discord Welcome bot

> Prefix: `!w`

If You're not sure what prefix is used can you just `@-mention` the bot (`@welcome-bot#0914`) and it will tell you what prefix is used.

These are the commands currently available:
- `ping` - Ping the bot.
- `test` - Test by sending welcome message
- `help` - Get help
- `chan` or `channel`
    - `set [channel_name]` - Set welcome channel, channel to send message
    - `get` - Get currently set welcome channel
    - `reset` - Reset channel back to default value
- `message` or `msg`
    - `set [message]` - Set welcome message
    - `get` - Get currently set welcome message
    - `reset` - Reset message back to default value
- `prefix`
    - `set [prefix]` - Set bot prefix
    - `get` - Get currently set bot prefix
    - `reset` - Reset prefix back to default value

Moderation commands (same perfix only):
- `ban [@user] (reason)` - Ban a user
- `unban [user_id]` - Unban a user
- `kick [@user] (reason)` - Kick a user

NOTE: `reason` will be set to "Not specified" if you don't specify any reason in the moderation commands

The brakets in these commands mean:
```
[] = Required argument
() = Optional argument
```

All these commands should be prefixed with prefix i.e. for command `ping` you have to send `w/ping` in the channel the bot has perms to read and send messages.

In some of these you will see under a command their is a command, to execute those, send `command subcommand args` where `command` is the command, `subcommand` is the subcommand and `args` is/are the argument(s)

Example usage of subcommand: `w/message set Welcome {mention}!`

## Placeholders in welcome message
There are some placeholders you can use in the welcome message which will be replaced by their values by the bot.

Example: `{server}` will be replaced by the server's name

Available placeholders:
- `{server}` - The server's name
- `{mention}` - @-mention the user who has joined.
