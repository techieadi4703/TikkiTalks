import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from './lib/db.js';
dotenv.config();


const app=express();
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('ok Google, Server running');
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    connectDB();
});