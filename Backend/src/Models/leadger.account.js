const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"this is required field"],
        immutable:true,
        index:true
    },
    amount:{
        type:Number,
        required:[true,"this is required"],
        immutable:true
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        immutable:true,
        index:true,
        required:[true,"thisis required"]
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"],
            message:"type can be CREDIT or DEBIT"
        },
        required:[true,"this is required"],
        immutable:true
    }

});

function preventleadgerModification(){
    throw new Error("Leadger entries are immutable and cannot be modified or deleted.");
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);

const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;

