const Version = require("../../../schema/versionSchema");

module.exports = (versionName, changelog) => {
    return new Promise((resolve, reject) => {
        Version.where({ versionName: versionName }).findOne((err, ver) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (ver) {
                console.log("Version already added.");
                return resolve(false);
            } else {
                let version = new Version({
                    versionName: versionName,
                    changelog: changelog,
                });
                version.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return resolve(true);
                    }
                });
            }
        });
    });
};
