/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = class DonorUtil {
    constructor(client, member) {
        this.client = client;
        this.member = member;
    }

    get status() {
        const donorRoles = this.client.config.roles.donators;
        for (const i in donorRoles) {
            const val = donorRoles[i];
            if (this.member.roles.cache.has(val)) {
                return i;
            }
        }
        return null;
    }
};
