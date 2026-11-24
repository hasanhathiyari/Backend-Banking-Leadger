const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized access"
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

module.exports = {authMiddleware};
