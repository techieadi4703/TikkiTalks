import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
dotenv.config();
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app=express();
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('ok Google, Server running');
});
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    connectDB();
});