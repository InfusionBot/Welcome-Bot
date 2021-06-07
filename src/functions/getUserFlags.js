/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = async (user) => {
    const flags = user.flags || (await user.fetchFlags());
    let userFlags = [];
    //https://discord.js.org/#/docs/main/v12/class/UserFlags?scrollTo=s-FLAGS
    const allFlags = [
        {
            id: "DISCORD_EMPLOYEE",
            url: "https://cdn.discordapp.com/emojis/604997907397214208.png?v=1",
        },
        { id: "PARTNERED_SERVER_OWNER", url: "" },
        { id: "HYPESQUAD_EVENTS", url: "https://cdn.discordapp.com/emojis/604997907053281300.png?v=1" },
        {
            id: "BUGHUNTER_LEVEL_1",
            url: "https://cdn.discordapp.com/emojis/604997907095093248.png?v=1",
        },
        {
            id: "HOUSE_BRAVERY",
            url: "https://cdn.discordapp.com/emojis/640336405079392319.png?v=1",
        },
        {
            id: "HOUSE_BRILLIANCE",
            url: "https://cdn.discordapp.com/emojis/640336405377187842.png?v=1",
        },
        {
            id: "HOUSE_BALANCE",
            url: "https://cdn.discordapp.com/emojis/640336405431713802.png?v=1",
        },
        {
            id: "EARLY_SUPPORTER",
            url: "https://cdn.discordapp.com/emojis/720584849832017920.png?v=1",
        },
        { id: "TEAM_USER", url: "" },
        { id: "SYSTEM", url: "" },
        {
            id: "BUGHUNTER_LEVEL_2",
            url: "https://cdn.discordapp.com/emojis/657002233556107264.png?v=1",
        },
        { id: "VERIFIED_BOT", url: "" },
        { id: "EARLY_VERIFIED_BOT_DEVELOPER", url: "" },
    ];
    for (let flag of allFlags) {
        const hasFlag = flags.toArray().includes(flag.id);
        if (hasFlag) userFlags.push(flag);
    }
    return userFlags;
};
