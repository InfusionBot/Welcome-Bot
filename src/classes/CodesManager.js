/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Embed = require("./Embed");
module.exports = class CodesManager {
    #valid;
    #used;
    #codesInfo;
    constructor(client) {
        this.client = client;
        this.#valid = {};
        this.#used = {};
        this.#codesInfo = new Map();
    }

    async create(exdays = 30) {//exdays is the expire days
        const endsAt = new Date();
        endsAt.setTime(endsAt.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let code = "";
        const length = 4;
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
        for (let i = 0; i < length; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        this.#valid.push(code);
        const info = { endsAt: endsAt.getTime(), code };
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
                    fields: [{
                        title: "Ends At",
                        value: `${endsAt}`,
                        inline: true
                    }]
                }
            );
            channel.send({ embeds: [embed] });
        }
        return info;
    }

    async use(code) {
        const info = this.#codesInfo.get(code);
        if (info) return { error: "Invalid code" };
        const index = this.#valid.indexOf(code);
        if (index > -1) {
            this.#valid.splice(index, 1);
        }
        this.#used.push(code);
        const channel = await this.client.channels.fetch(
            this.client.config.channels.codes
        );
        if (channel) {
            const embed = new Embed(
                { color: "red", timestamp: true },
                {
                    description: `Code: ${code}`,
                    title: "Premium code used",
                    fields: [{
                        title: "Ends At",
                        value: `${new Date(info.endsAt)}`,
                        inline: true
                    }]
                }
            );
            channel.send({ embeds: [embed] });
        }
        return info;
    }

    get valid() {
        return this.#valid;
    }

    get used() {
        return this.#used;
    }
};
