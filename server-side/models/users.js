const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    matches: {
        wins: Number,
        loses: Number
    },
    moneys: Number,
    player: {
        level: Number,
        exp: Number
    },
    info: {
        name: String,
        nickname: String,
        email: String,
        password: String,
        createdAt: Date
    }
})

module.exports = mongoose.model("Guild", guildSchema);