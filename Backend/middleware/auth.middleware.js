import jwt from "jsonwebtoken";
import User from "../models/users.model.js";



export const protectRoute =async(req,res,next)=>{
    try {
        const token=req.cookies.jwToken;
        if(!token) {
            return res.status(401).json({msg:"Unauthorized::No token provided"});
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded) {
            return res.status(401).json({msg:"Unauthorized::Invalid token provided"});
        }
        // console.log(decoded);
        const user=await User.findById(decoded.userID).select("-password");
        if(!user) {
            return res.status(404).json({msg:"Unauthorized::User not found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("error in protectRoute middleware",error);
        res.status(500).json({msg:"Internal protectRoute error"});
    }

}
