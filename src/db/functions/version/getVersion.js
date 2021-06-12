const Version = require("../../../schema/versionSchema");

module.exports = (versionName) => {
    return new Promise((resolve, reject) => {
        Version.where({ versionName: versionName }).findOne((err, ver) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (ver) {
                return resolve(ver);
            } else {
                return resolve(false);
            }
        });
    });
};
