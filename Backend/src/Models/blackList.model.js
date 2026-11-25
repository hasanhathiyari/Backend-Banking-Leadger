const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"],
        unique:[true,"Token is already blacklisted"]
    }
},{
    timestamps:true
})

BlacklistSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 60 * 60 * 24 * 3 // 3 days
})

const tokenBlacklistModel = mongoose.model("tokenBlacklist",BlacklistSchema);

module.exports = tokenBlacklistModel;