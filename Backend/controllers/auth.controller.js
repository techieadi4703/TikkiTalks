import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


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
                profilePicture:"",
                message:'User created successfully',
            });
            console.log("signed up successfully")
        }
        else{
            res.status(400).json({message:'Invalid user data, user not created'});
        }
    } catch (error) {
        console.log("\n\nerror in signup controller:",error);
        res.status(500).json({message:'signup controller went wrong, please try again later'});
    }
}

export const login= async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user){
            console.log("mail galat")
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            console.log("pass galat")
            return res.status(400).json({message:"Invalid credentials"});
        }
        
        generateToken(user._id,res);
        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email, 
            profilePicture:user.profilePicture,
            message:'User logged in successfully',
        });
        console.log('logged in successfully')

    } catch (error) {
        console.log("Error in login route");
        res.status(500).json({message:'login controller went wrong, please try again later'});
    }
}

export const logout=(req,res)=>{
    try {
        res.cookie("jwToken","",{
            maxAge:0
        })
        res.status(200).json({message:'logged out successfully'});
        console.log("logged out successfully")
    } catch (error) {
        console.log("Error in logout route");
        res.status(500).json({message:'logout controller went wrong, please try again later'});
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePicture}=req.body;
        const userID=req.user._id;
        
        if(!profilePicture){
            return res.status(400).json({message:'Please provide profile picture'});
        }
        const uploadResponse=  await cloudinary.uploader.upload(profilePicture);
        const updatedUser= await User.findByIdAndUpdate(userID,{profilePicture:uploadResponse.secure_url},{new:true});
        if(updatedUser){
            res.status(200).json({
                _id:updatedUser._id,
                fullName:updatedUser.fullName,
                email:updatedUser.email,
                profilePicture:updatedUser.profilePicture,
                message:'Profile updated successfully',
            });
            console.log('Profile updated successfully')
        }
        else{
            res.status(400).json({message:'Invalid user data, profile not updated'});
        }


    } catch (error) {
        console.log("Error in update-Profile route");
        res.status(500).json({message:'update-Profile controller went wrong, please try again later'});
    }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth route");
        res.status(500).json({message:'checkAuth controller went wrong, please try again later'});
        
    }
}