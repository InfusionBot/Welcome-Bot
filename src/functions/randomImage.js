/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const pokemon = require("pokemon");
//https://stackoverflow.com/a/4878800
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
module.exports = function (random = true) {
    if (random === true) random = pokemon.random();
    else random = toTitleCase(random);
    let imageId = pokemon.getId(random);
    let imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${imageId}.png`;
    return new Promise(function (resolve, reject) {
        if (imageUrl) {
            resolve(imageUrl);
        } else {
            reject("Can't get image");
        }
    });
};
