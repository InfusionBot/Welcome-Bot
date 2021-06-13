/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const pokemon = require("pokemon");
module.exports = function () {
    let imageId = pokemon.getId(pokemon.random());
    let imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${imageId}.png`;
    return new Promise(function (resolve, reject) {
        if (imageUrl) {
            resolve(imageUrl);
        } else {
            reject("Can't get image");
        }
    });
};
