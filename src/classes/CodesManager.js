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
        this.refresh();
        setInterval(() => this.refresh(), 1 * 60 * 60 * 1000); //Every hour
    }

    async refresh() {
        const codes = await this.client.models.Code.find({});
        for (let i = 0; i < codes.length; i++) {
            if (codes[i].expiresAt < Date.now()) {
                this.client.models.Code.findOneAndDelete({
                    code: codes[i].code,
                });
                continue;
            }
            this.#codesInfo.set(codes[i].code, codes[i]);
        }
        return codes;
    }

    async create(exdays = 30) {
        //exdays is the expire days
        const expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + exdays * 24 * 60 * 60 * 1000);
        let code = "";
        const length = 6;
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
        for (let i = 0; i < length; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        const info = { expiresAt: expiresAt.getTime(), code };
        const codeDB = new this.client.models.Code(info);
        await codeDB.save();
        this.#codesInfo.set(code, info);
        const channel = await this.client.channels.fetch(
            this.client.config.channels.codes
        );
        if (channel) {
            const embed = new Embed({ color: "success", timestamp: true })
                .setTitle("New premium code created")
                .setDesc(`Code: ${code}`)
                .addField("Expires", `${expiresAt}`, true);
            channel.send({ embeds: [embed] });
        }
        return info;
    }

    async use(code) {
        if (!code) throw new TypeError("code not provided");
        const info = this.#codesInfo.get(code);
        if (!info) return { error: "invalid" };
        if (info.used) return { error: "used" };
        const codeDB = await this.client.models.Code.findOne(info);
        codeDB.used = true;
        await codeDB.save();
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

    getCode(code) {
        if (!code) throw new TypeError("code not provided");
        return this.#codesInfo.get(code);
    }

    get valid() {
        return this.#codesInfo;
    }

    get used() {
        return this.#codesInfo.filter((c) => c.used);
    }

    get notUsed() {
        return this.#codesInfo.filter((c) => !c.used);
    }
};
