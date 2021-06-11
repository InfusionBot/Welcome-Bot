/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const https = require("https");
const sendReq = function (data, options) {
    let body = "";
    const req = https
        .request(options, (res) => {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            console.log("message: ", res.statusMessage);
        })
        .on("response", function (res) {
            res.setEncoding("binary");
            res.on("error", (err) => {
                console.error(err);
            })
                .on("data", (chunk) => {
                    body += chunk;
                })
                .on("end", () => {
                    return;
                });
        })
        .on("error", (err) => {
            console.error(err.message);
        });

    req.write(data);
    req.end();
    return body;
};
module.exports = function (member) {
    let data;
    let options;
    let image;

    if (process.env.IMAGE_token) {
        data = JSON.stringify({
            username: member.user.tag,
            avatar: member.user.displayAvatarURL(),
            background: "#aaaaaa",
            members: "You are our member #" + member.guild.memberCount,
            icon: "pikachu",
            banner: "space",
            color_welcome: "#ffffff",
            color_username: "#ffffff",
            color_members: "#ffffff",
        });
        options = {
            hostname: "api.fluxpoint.dev",
            path: "/gen/welcome",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.IMAGE_token,
                "User-Agent": process.env.userAgent,
            },
        };
        console.log("Done!");
        image = sendReq(data, options);
    } else {
        console.log("NOTE: IMAGE_token is not set");
    }
    return new Promise(function (resolve, reject) {
        if (image) {
            resolve(image);
        } else {
            reject("Can't get image");
        }
    });
};
