const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const BlacklistModel = require("../Models/blackList.model");

async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized access"
        })
    }

    const tokenBlacklisted = await BlacklistModel.findOne({ token });

    if (tokenBlacklisted) {
        return res.status(401).json({
            success:false,
            message:"unauthorized access token is invalid "
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        req.user = user;
         return next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
}

async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }
    const tokenBlacklisted = await BlacklistModel.findOne({ token });

    if (tokenBlacklisted) {
        return res.status(401).json({
            success:false,
            message:"unauthorized access token is invalid "
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(decoded.userId).select("+systemUser")
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user

        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}

module.exports = {authMiddleware ,authSystemUserMiddleware };
