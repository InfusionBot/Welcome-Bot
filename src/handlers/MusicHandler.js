/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Manager: LavacordManager } = require("lavacord");
const fs = require("fs");
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require("@discordjs/voice");
const { YAMLException } = require("js-yaml");
class Manager extends LavacordManager {
    constructor(client, nodes, options = {}) {
        super(nodes, options);

        this.send = (packet) => {
            if (client.guilds.cache) {
                const guild = client.guilds.cache.get(packet.d.guild_id);
                if (guild) return guild.shard.send(packet);
            }
        };

        client.once("ready", () => {
            this.user = client.user.id;
            this.shards = client.options.shardCount || 1;
        });

        if (client.guilds.cache && typeof client.ws.send === "undefined") {
            client.ws
                .on("VOICE_SERVER_UPDATE", this.voiceServerUpdate.bind(this))
                .on("VOICE_STATE_UPDATE", this.voiceStateUpdate.bind(this))
                .on("GUILD_CREATE", async (data) => {
                    for (const state of data.voice_states)
                        await this.voiceStateUpdate({
                            ...state,
                            guild_id: data.id,
                        });
                });
        }
    }
}

module.exports = class MusicHandler {
    constructor(client) {
        this.client = client;
        const yml = require("js-yaml").load(
            fs.readFileSync(`${__dirname}/../../application.yml`, "utf8")
        );
        this.manager = new Manager(
            client,
            [{...yml, id: "0"}]
        );
        this.players = {};
    }

    async initialize() {
        // Connects all the LavalinkNode WebSockets
        await this.manager.connect();
    }

    async search(search) {
        // This gets the best node available, what I mean by that is the idealNodes getter will filter all the connected nodes and then sort them from best to least beast.
        const node = this.manager.idealNodes[0];
    
        const params = new URLSearchParams();
        params.append("identifier", search);
    
        return await require("axios").get(`http://${node.host}:${node.port}/loadtracks?${params}`, { headers: { Authorization: node.password } })
            .then(res => res.data.tracks)
            .catch(err => {
                console.error(err);
                return null;
            });
    }

    async findOrCreatePlayer(guild, channel) {
        const { id: guildId } = guild;
        if (this.players[guildId]) return this.players[guildId];
        const player = await this.manager.join({
            guild: guildId, // Guild id
            channel: channel.id, // Channel id
            node: "0" // lavalink node id, based on array of nodes
        });
        this.players[guildId] = player;
        const conn = this.join(channel);
        return { player, connection: conn ?? null };
    }

    async play(guild, track) {
        const player = this.players[guild.id];
        await player.play(track); // Track is a base64 string we get from Lavalink REST API
        player.on("error", error => console.error(error));
        player.on("end", data => {
            if (data.reason === "REPLACED") return; // Ignore REPLACED reason to prevent skip loops
            // Play next song
        });
        return player;
    }

    async join(channel) {
        let conn = joinVoiceChannel({
            guildId: channel.guild.id,
            channelId: channel.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
        try {
            conn = await entersState(conn, VoiceConnectionStatus.Ready, /*max time*/ 20000);
            return conn;
        } catch (err) {
            conn.destroy();
            throw err;
        }
    }

    async leave(guild) {
        return await this.manager.leave(guild.id);
    }
};
