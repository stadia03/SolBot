import express from 'express';
import User from '../models/User.js';

import verifyToken from '../middleware/verifyToken.js';
import keyMap from '../models/KeyMap.js';
import bs58 from 'bs58';

import {Connection, Keypair, Transaction} from "@solana/web3.js";

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/DZHbnZioln7-ITlLrhFgZZlcSSiP3yan");


const router = express.Router();


router.get('/getUser',verifyToken, async(req,res)=>{
  
  try{
    const {email} = req.query;
  

  const user = await User.findOne({email});
  const key = await keyMap.findOne({email});

  res.status(200).json({user,key});
 
  
  }catch(error){

    res.status(400).json({message : "User not found!"});
  }
  
  

});


router.post('/updateKey', verifyToken, async (req, res) => {
  try {
    const { email, key } = req.body;

    if (!email || !key) {
      return res.status(400).json({ message: "Email and key are required!" });
    }

  

    // Upsert: Update the document if it exists, otherwise create a new one
    const response = await keyMap.findOneAndUpdate(
      { email: email }, // Query condition
      { privateKey: key }, // Update values
      { new: true, upsert: true } // Return updated doc & create if it doesn't exist
    );

   

    res.status(201).json({ key: response.privateKey });
  } catch (error) {
    console.error("Error updating key:", error);
    res.status(400).json({ message: "Error updating key!" });
  }
});


router.post('/sign',verifyToken, async(req,res)=>{
  try{
    const serializedTransaction = req.body.tnx;
    const email = req.body.email;
    const {privateKey} = await keyMap.findOne({email});
    
    const pvtKey= bs58.decode(privateKey);
    const keypair = Keypair.fromSecretKey(pvtKey);
    const tx = Transaction.from(Buffer.from(serializedTransaction));
    const {blockhash} = await connection.getLatestBlockhash();
    tx.blockhash=blockhash;
    tx.feePayer = keypair.publicKey;
    tx.sign(keypair);
    // console.log(tx,keypair); 
    const signature = await  connection.sendTransaction(tx, [keypair]);
    // console.log(signature);
    res.json({signature : {signature}});
  }catch(error){
    res.status(401).json({error : error});
    console.log(error);
  }
});

export default router;

