const mongoose = require("mongoose");

const transctionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",  
        required:[true,"from account is required"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"To account is required"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"status can be either pending , completed , failed , or reversed"
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required which prevents duplicate tarnsactions"],
        index:true,
        unique:true
        
    }
},{
    timestamps:true
});

const transactionModel = mongoose.model("transaction", transctionSchema);

module.exports = transactionModel;