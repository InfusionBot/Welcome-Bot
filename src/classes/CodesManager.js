/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Embed = require("./Embed");
const { Collection } = require("discord.js");
module.exports = class CodesManager {
    #codesInfo;
    constructor(client) {
        this.client = client;
        this.#codesInfo = new Collection();
        this.initialize();
        setInterval(this.initialize, 1 * 60 * 60 * 1000); //Every hour
    }

    async initialize() {
        const codes = await this.client.models.Code.find({});
        for (let i = 0; i < codes.length; i++) {
            if (codes[i].expiresAt < Date.now()) {
                this.client.models.Code.findOneAndDelete({
                    code: codes[i].code,
                });
                continue;
            }
            this.#codesInfo[codes[i].code] = codes[i];
        }
    }

    async create(exdays = 30) {
        //exdays is the expire days
        const expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + exdays * 24 * 60 * 60 * 1000);
        let code = "";
        const length = 4;
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
        for (let i = 0; i < length; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        const info = { expiresAt: expiresAt.getTime(), code };
        const code = new this.client.models.Code(info);
        await code.save();
        this.#codesInfo.set(code, info);
        const channel = await this.client.channels.fetch(
            this.client.config.channels.codes
        );
        if (channel) {
            const embed = new Embed(
                { color: "sucess", timestamp: true },
                {
                    description: `Code: ${code}`,
                    title: "New premium code created",
                    fields: [
                        {
                            title: "Expires",
                            value: `${expiresAt}`,
                            inline: true,
                        },
                    ],
                }
            );
            channel.send({ embeds: [embed] });
        }
        return info;
    }

    async use(code) {
        const info = this.#codesInfo.get(code);
        if (info) return { error: "Invalid code" };
        if (info.used) return { error: "Code already used" };
        const code = await this.client.models.Code.findOne(info);
        code.used = true;
        await code.save();
        this.#codesInfo.delete(info.code);
        this.#codesInfo.set(info.code, { ...info, used: true });
        const channel = await this.client.channels.fetch(
            this.client.config.channels.codes
        );
        if (channel) {
            const embed = new Embed(
                { color: "red", timestamp: true },
                {
                    description: `Code: ${code}`,
                    title: "Premium code used",
                    fields: [
                        {
                            title: "Expires",
                            value: `${new Date(info.expiresAt)}`,
                            inline: true,
                        },
                    ],
                }
            );
            channel.send({ embeds: [embed] });
        }
        return info;
    }

    get valid() {
        return this.#codesInfo.filter((c) => !c.used);
    }

    get used() {
        return this.#codesInfo.filter((c) => c.used);
    }
};
