require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

process.env?.SHARDS === "undefined"
    ? require("./src/bot")
    : require("./src/shard");
