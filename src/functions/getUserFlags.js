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
            emoji: "604997907397214208",
        },
        { id: "PARTNERED_SERVER_OWNER", emoji: "" },
        {
            id: "HYPESQUAD_EVENTS",
            emoji: "604997907053281300.png",
        },
        {
            id: "BUGHUNTER_LEVEL_1",
            emoji: "604997907095093248.png",
        },
        {
            id: "HOUSE_BRAVERY",
            emoji: "640336405079392319.png",
        },
        {
            id: "HOUSE_BRILLIANCE",
            emoji: "640336405377187842",
        },
        {
            id: "HOUSE_BALANCE",
            emoji: "640336405431713802",
        },
        {
            id: "EARLY_SUPPORTER",
            emoji: "720584849832017920",
        },
        { id: "TEAM_USER", emoji: "" },
        { id: "SYSTEM", emoji: "" },
        {
            id: "BUGHUNTER_LEVEL_2",
            emoji: "657002233556107264",
        },
        { id: "VERIFIED_BOT", emoji: "" },
        { id: "EARLY_VERIFIED_BOT_DEVELOPER", emoji: "" },
    ];
    for (let flag of allFlags) {
        const hasFlag = flags.toArray().includes(flag.id);
        if (hasFlag) userFlags.push(flag);
    }
    return userFlags;
};
