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
module.exports = function () {
    let data;
    let options;

    data = "";
    options = {
        hostname: "pokeapi.co",
        path: "/api/v2/pokemon?limit=151",
        method: "POST",
        headers: {
            "User-Agent": process.env.userAgent,
        },
    };
    console.log("Done!");
    let json = sendReq(data, options);
    options = {
        ...options
        path: new URL(json.url.replace(options.hostname, "")).pathname;
    };
    let imageId = sendReq(data, options).id;
    let imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${imageId}.png`;
    return new Promise(function (resolve, reject) {
        if (image) {
            resolve(imageUrl);
        } else {
            reject("Can't get image");
        }
    });
};
