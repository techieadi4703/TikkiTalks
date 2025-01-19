import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import { generateToken } from '../lib/utils.js';



export const signup= async (req,res)=>{
    // res.send('Signup route');n
    const {fullName,email,password}=req.body;
    try {
        if(password.length<6){
            return res.status(400).json({message:'Password must be at least 6 characters long'});
        }
        const existing= await User.findOne({email});
        if(existing){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPass = await bcrypt.hash(password,10);
        // const user1=await User.create({email,password:hashedPass,fullName});
        const user=new User({email,password:hashedPass,fullName});
        if(user){
            generateToken(user._id,res);
            await user.save();
            res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePicture:user.profilePicture,
                message:'User created successfully',
            });
        }
        else{
            res.status(400).json({message:'Invalid user data, user not created'});
        }
    } catch (error) {
        console.log("\n\nerror in signup controller:",error);
        res.status(500).json({message:'signup controller went wrong, please try again later'});
    }
}

export const login=(req,res)=>{
    res.send('Login route');
}

export const logout=(req,res)=>{
    res.send('Logout route');
}