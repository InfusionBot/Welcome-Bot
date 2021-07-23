/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
const fs = require("fs");
const { CheckAuth } = require("./utils");
const path = require("path");
const express = require("express");
const session = require("express-session");

module.exports.load = (client) => {
    if (client.debug) client.logger.log("loading dashboard");
    const app = express();
    app.use(express.urlencoded({ extended: true }))
        .use(express.json())
        //Set engine to html for embedded js template
        .engine("html", require("ejs").renderFile)
        .set("view engine", "ejs")
        // Set the ejs templates to ./views
        .set("views", path.join(__dirname, "/views"))
        //Set express session
        .use(
            session({
                secret: client.config.dashboard.secret,
                resave: false,
                saveUninitialized: false,
            })
        )
        //Set port
        .set("port", client.config.dashboard.port || 3000)
        //Adding new shortcuts by extending like a plugin
        .use((req, res, next) => {
            req.user = req.session.user;
            req.userDB = req.user
                ? client.userDbFuncs.getUser(req.user.id)
                : null;
            req.translate = client.i18next.getFixedT("en-US"); //TODO: Support other langs
            req.currentURL = `${req.protocol}://${req.get("host")}${
                req.originalUrl
            }`;
            req.client = client;
            next();
        });

    const routesFolder = path.join(__dirname, "/routes");
    const routesFiles = fs
        .readdirSync(routesFolder)
        .filter((file) => file.endsWith(".js"));
    for (const file of routesFiles) {
        let f = file.replace(".js", "");
        if (f.indexOf("index") > -1) f = "/";
        else f = `/${f}`;
        try {
            app.use(f, require(`${routesFolder}/${f}`));
        } catch (e) {
            console.error(e);
        }
    }

    app
        // Since this is the last non-error-handling we assume 404.
        .use((req, res) => {
            if (req.accepts("html")) {
                res.render("404", {
                    user: req.userDB,
                    translate: req.translate,
                    currentURL: req.currentURL,
                });
            } else if (req.accepts("json")) {
                res.json({ error: "Page Not Found" });
            } else {
                return res.type("txt").sendStatus(404);
            }
            res.status(404);
            res.end();
        })
        //Error handler
        .use(CheckAuth, (err, req, res) => {
            console.error(err);
            if (!req.user) return res.redirect("/");
            if (req.accepts("html")) {
                res.render("500", {
                    user: req.userDB,
                    translate: req.translate,
                    currentURL: req.currentURL,
                });
            } else if (req.accepts("json")) {
                res.json({ error: "Internal Server Error" });
            } else {
                return res.type("txt").sendStatus(500);
            }
            res.status(500);
            red.end();
        });

    app.listen(app.get("port"), () => {
        console.log(`Dashboard running on port ${app.get("port")}`);
    });
};
