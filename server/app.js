import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tnxRoutes from './routes/tnxRoutes.js';
const app = express();

// import tnxRoutes from './routes/tnxRoutes';

app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
app.use('/api/v1/tnx',tnxRoutes);
app.use('/auth', authRoutes); 

// app.use('/api', );  


mongoose.connect(process.env.mongo_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// .then(()=>{
//   console.log("DB connected");
//   app.listen(process.env.PORT, ()=> console.log(`Listening on ${process.env.PORT}`))
// })

.catch((err)=>{
  console.log(err);
})


export default app;




