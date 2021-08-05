/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = function (perms, allPerms, t) {
    const newPerms = [];
    for (var i = 0; i < allPerms.length; i++) {
        const index = perms.indexOf(allPerms[i].perm);
        if (index !== -1) {
            newPerms[index] = t(`permissions:${allPerms[i].val}`);
        }
    }
    return newPerms;
};
