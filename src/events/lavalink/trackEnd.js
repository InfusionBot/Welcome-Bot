/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "trackEnd",
    once: false,
    async execute(client, player /*, track, payload*/) {
        const autoplay = player.get("autoplay");
        if (autoplay) {
            const requester = player.get("requester");
            const { identifier } = player.queue.current;
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            const res = await player.search(search, requester);
            player.queue.add(res.tracks[2]);
        }
    },
};
