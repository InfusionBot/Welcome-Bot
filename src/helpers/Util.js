/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const userFromMention = function (mention, client) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<@!?(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return null;

    // However, the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    const id = matches[1];

    return client.users.cache.get(id);
};

const channelIdFromMention = function (mention) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<#!?(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return null;

    // However, the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    return matches[1];
};

const roleIdFromMention = function (mention) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<@&?(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return null;

    // However, the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    return matches[1];
};

/*const lowercaseKeys = (obj) => {
    Object.keys(obj).reduce((acc, key) => {
        obj[key.toLowerCase()] = obj[key];
    });
    return obj;
};

const lowercaseVals = (obj) => {
    Object.keys(obj).reduce((acc, key) => {
        obj[key] = obj[key].toLowerCase();
    });
    return obj;
};

const lowercaseArray = (arr) => {
    return arr
        .map((val) => {
            return val.toLowerCase();
        })
        .sort();
};*/

//https://stackoverflow.com/a/15397495
const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const convertTime = (duration) => {
    //const milliseconds = parseInt((duration % 1000) / 100);
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (duration < 3600000) {
        return minutes + ":" + seconds;
    } else {
        return hours + ":" + minutes + ":" + seconds;
    }
};

module.exports = {
    userFromMention,
    channelIdFromMention,
    roleIdFromMention,
    /*lowercaseKeys,
    lowercaseVals,
    lowercaseArray,*/
    nth,
    escapeRegex,
    convertTime,
};
