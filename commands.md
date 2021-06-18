Welcome-Bot contains more than **20 commands** in **9 categories**!

#### Contents of the table
**Name**: The name of the command  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters  
**Subcommands**: Subcommands to that command if availsble  
**Aliases**: Duplicate names for this command which can be used.  
**Cooldown**: The time that must elapse between each command so that it can be executed again by the user

### Setup (5 commands)| Name        | Description                                                                                   | Usage                  | Subcommands                                                                                                                         | Aliases | Cooldown |
| ----------- | --------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| **channel** | Manage channel for this server
Not providing any arguments will display the current settings. | None                   | `set` - Set Welcome channel
`setMod` - Set Moderation channel
`reset` - Reset Welcome channel
`resetMod` - Reset Moderation channel | chan    | 10       |
| **enable**  | Enable/Disable welcome and goodbye logs. Not providing any args will show current settings.   | [true / false]         | None                                                                                                                                | None    | 10       |
| **follow**  | Get news and version updates to this bot.                                                     | [channel / channel id] | None                                                                                                                                | getnews | 10       |
| **message** | Manage welcome message for this server                                                        | None                   | `set` - Set Welcome message
`reset` - Reset Welcome message                                                                         | msg     | 10       |
| **prefix**  | Manage perfix for this server                                                                 | None                   | `set` - Set prefix
`reset` - Reset prefix                                                                                           | None    | 10       |

### General (3 commands)| Name       | Description                                               | Usage          | Subcommands | Aliases  | Cooldown |
| ---------- | --------------------------------------------------------- | -------------- | ----------- | -------- | -------- |
| **help**   | List all of my commands or info about a specific command. | (command name) | None        | commands | 5        |
| **invite** | Get Invite link for the bot                               | None           | None        | None     | 20       |
| **ping**   | Ping the bot                                              | None           | None        | None     | 5        |

### Information (4 commands)| Name        | Description                                                                   | Usage                | Subcommands | Aliases | Cooldown |
| ----------- | ----------------------------------------------------------------------------- | -------------------- | ----------- | ------- | -------- |
| **info**    | Bot information                                                               | (--dm)               | None        |         | 10       |
| **stats**   | Your server statistics                                                        | (--dm)               | None        | server  | 10       |
| **user**    | Get information about a user. It will show your info if no user was mentioned | (@mention / user_id) | None        | whois   | 3        |
| **version** | Information on a version                                                      | (version)            | None        | ver     | 10       |

### Manage (1 commands)| Name      | Description     | Usage                             | Subcommands                                                                                                                    | Aliases | Cooldown |
| --------- | --------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- |
| **prune** | Prune messages. | [no of msg to prune / subcommand] | `all` - Delete 100 messages
`bots` - Delete all messages sent by a bot
`*` - `*Text` will delete any message containing "Text" | None    | 10       |

### Moderation (3 commands)| Name      | Description   | Usage               | Subcommands | Aliases | Cooldown |
| --------- | ------------- | ------------------- | ----------- | ------- | -------- |
| **ban**   | Ban a user.   | [@user] (reason)    | None        | None    | 5        |
| **kick**  | Kick a user.  | [@mention] (reason) | None        | None    | 5        |
| **unban** | Unban a user. | [user_id]           | None        | None    | 5        |

### Miscellaneous (2 commands)| Name       | Description           | Usage | Subcommands | Aliases   | Cooldown |
| ---------- | --------------------- | ----- | ----------- | --------- | -------- |
| **test**   | Test welcome message  | None  | None        | None      | 3        |
| **uptime** | Get uptime of the bot | None  | None        | getuptime | 10       |

### Fun (3 commands)| Name        | Description                      | Usage               | Subcommands | Aliases     | Cooldown |
| ----------- | -------------------------------- | ------------------- | ----------- | ----------- | -------- |
| **figlet**  | Implement the FIGfont spec in JS | [string]            | None        |             | 10       |
| **image**   | Generate a random pokemon image  | None                | None        | randomImage | 10       |
| **pokemon** | Get a pokemon image              | [pokemon character] | None        | pokémon     | 10       |

### Owner Only (3 commands)| Name        | Description         | Usage       | Subcommands | Aliases | Cooldown |
| ----------- | ------------------- | ----------- | ----------- | ------- | -------- |
| **eval**    | Execute a statement | [statement] | None        | None    | 20       |
| **reload**  | Reloads a command   | [command]   | None        | None    | 30       |
| **restart** | Restart the bot     | None        | None        | None    | 30       |

### Core (1 commands)| Name        | Description                   | Usage | Subcommands | Aliases | Cooldown |
| ----------- | ----------------------------- | ----- | ----------- | ------- | -------- |
| **website** | Link to Welcome-Bot's website | None  | None        | site    | 10       |

