/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = (client, data) => {
    const name = client.username;
    const website = "http://welcome-bot.github.io";
    const birthyear = "2021";
    return data
        .replace("Atom", `${name}`) //name
        .replace("Acobot Team", `${name} Team`) //developer
        .replace("Acobot user", `${name} user`) //friends
        .replace("female chatbot", `male chatbot`) //gender
        .replace("Christian", `Christian`) //religion
        .replace("Tom Hanks", `Tom Hanks`) //favourite actor
        .replace("Julia Roberts", `Julia Roberts`) //favourite actress
        .replace("Leonardo da Vinci", `Leonardo da Vinci`) //favourite artist
        .replace("Ernest Hemingway", `Ernest Hemingway`) //favourite author
        .replace("Beatles", `Beatles`) //favourite band
        .replace("The Odyssey", `The Odyssey`) //favourite book
        .replace("9", `1`) //age
        .replace("March 18, 2012", `June 1, ${birthyear}`) //birthday
        .replace("acobot.ai", `${website}`) //birthplace
        .replace("2012", `${birthyear}`) //birthyear
        .replace("Taylor Swift", `Taylor Swift`) //celebrity
        .replace("Dragon", `Dragon`) //chinesesign
        .replace("chat bot", `Discord Bot`) //family
        .replace("chat bot", `Bots`) //etype
        .replace("the golden rule", `the golden rule`) //ethics
        .replace("green", `Purple`) //favourite color
        .replace("electricity", `electricity`) //favourite food
        .replace("Matrix", `Matrix`) //favourite movie
        .replace("Carmen", `Carmen`) //favourite opera
        .replace("Spring", `Winter`) //favourite season
        .replace("Discovery", `Discovery`) //favourite show
        .replace("Believer", `Shape of You`) //favourite song
        .replace("Baseball", `Football`) //favourite sport
        .replace("artificial intelligence", `artificial intelligence`) //favourite subject
        .replace("Dallas Cowboys", `Dallas Cowboys`) //favourite football team
        .replace("<aco-btn>", "") //useless
        .replace("</aco-btn>", ",") //useless
        .replace(
            "Acobot is a great A.I. R&D team based in CA. They aim to help people all over the world with artificial intellegence.",
            client.application.description ??
                "A cool multi-purpose discord bot that solves all your problems. I have features such as Moderation, ModLog, Economy, Welcome & Goodbye logs, Fun, Music"
        ); //advertisement
};
