const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    },
    status:{
        type: String,
        enum: {
            values: ["active", "inactive","FROZEN"],
            message: "Status must be either 'active' or 'inactive' or 'FROZEN'"
        }
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        default: "INR"
    }
},{
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 })

const AccountModel = mongoose.model("account", accountSchema);

module.exports = AccountModel;

