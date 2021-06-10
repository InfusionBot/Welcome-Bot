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
        });
        options = {
            hostname: "api.fluxpoint.dev",
            path: "/gen/welcome",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.IMAGE_token,
            },
        };
        image = sendReq(data, options);
    } else {
        console.log("NOTE: IMAGE_token is not set");
    }
    return image;
};
