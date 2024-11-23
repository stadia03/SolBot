import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import KeyMap from '../models/KeyMap.js';

const router = express.Router();

router.post('/test', async(req,res)=>{
  const {test}=req.body;
  res.status(200).json({message: test});
})

router.post('/signup', async(req,res)=>{

  const {username,email, password,privateKey} = req.body;
  // console.log("reached signup", username, password, email,);
  try{
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({error : 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password : hashedPassword, email});
    await user.save();
    
    //saving the private key
    // console.log("from signup",privateKey);
    const keyMap = new KeyMap({email , privateKey });
     await keyMap.save();

    res.status(201).json({message : "User created successfully"});
  }
  catch(error){
    console.log(error);
    res.status(500).json({error : 'Error creating user'});
  }});

router.post('/signin', async(req,res)=>{

  const {email,password} = req.body;

  try{
    const user =await User.findOne({email});
    if(!user){
      return res.status(400).json({message : "User not found"});
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
 
    if(!isMatch){
      return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '1h'} );
    res.json({token,user});

  }
  catch(error){
    console.log(error);
    return res.status(500).json({message : "Error signing in"});
  }
} );



export default router;
