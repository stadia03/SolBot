import mongoose from "mongoose";

const keyMapSchema = new mongoose.Schema({
  email : {
    type : String,
    unique : true,
    required : true
  },
  privateKey : {
    type : String,
    unique : true,
    required : true
  }
});

export default mongoose.model('keyMap', keyMapSchema);