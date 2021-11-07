module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

    async getGuild(guildId) {
        if (this.client.shard) {
            // try to get guild from all the shards if we are sharding
            const req = await this.client.shard.broadcastEval(
                (c, id) => c.guilds.cache.get(id),
                {
                    context: guildId,
                }
            );

            // return Guild or null if not found
            return req.find((res) => !!res) || null;
        } else {
            //if no sharding, then just get from cache
            return this.client.guilds.cache.get(guildId);
        }
    }
};
