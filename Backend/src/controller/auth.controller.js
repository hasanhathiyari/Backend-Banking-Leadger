const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const EmailService = require("../Services/node.mailer");
const tokenBlacklistModel = require("../Models/blackList.model");



/**
 * @Post /api/users/register
 * @description register a new user using this controller 
 */

const registerUserController = async (req,res)=>{
    const {email,name,password} = req.body;

    const IsEmail = await userModel.findOne({email:email});

    if(IsEmail){
        return res.status(400).json({
            success:false,
            message:"email already exist"
        })
    }

    const user = await userModel.create({
        email,
        name,
        password
    });

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token)

    res.status(201).json({
        success:true,
        message:"user created successfully",
        user,
        token
    })

    await EmailService.sendRegisterEmail(user.email,user.name);
}

/**
 * @Post /api/users/login
 * @description login an existing user using this controller 
 */
const loginUserController = async (req, res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message:"invalid password"
        })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token)

    res.status(200).json({
        success:true,
        message:"user logged in successfully",
        user,
        token
    })
}

/**
 * @Post /api/users/logout
 * @description logout an existing user using this controller 
 */

const logoutUserController = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }

    await tokenBlacklistModel.create({
        token:token 
    })

    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out successfully"
    })
}



module.exports = {registerUserController, loginUserController , logoutUserController};