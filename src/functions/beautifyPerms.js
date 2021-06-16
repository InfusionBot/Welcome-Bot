/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

module.exports = function (perms, allPerms) {
    let index;
    for (var i = 0; i < allPerms.length; i++) {
        index = perms.indexOf(allPerms[i].perm)
        if (index !== -1) {
            perms[index] = allPerms[i].val;
        }
    }
    return perms;
};
