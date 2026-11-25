const accountModel = require("../Models/account.models.js");

async function createAccountController(req,res){
    const userId = req.user._id;

    const account = await accountModel.create({
        user:userId
    });
    res.status(201).json({
        message :true,
        AccountDetails:account
    });
}

async function getUserAccountsController(req,res){
    const accounts = await accountModel.find({
        user:req.user._id
    });
    res.status(200).json({
        accounts
    })
}
async function getaccountBalanceController(req,res){
    const {accountId} = req.params;

    const account = await accountModel.findOne({
        _id:accountId,
        user:req.user._id
    });

    if(!account){
        return res.status(404).json({
            message:"Account not found"
        })
    }

    const balace = await account.getBalance();

    res.status(200).json({
        accountId:account._id,
        balance:balace
    })
}

module.exports = {createAccountController,getUserAccountsController,getaccountBalanceController};