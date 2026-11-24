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

module.exports = {createAccountController};