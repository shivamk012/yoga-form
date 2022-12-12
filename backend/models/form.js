import mongoose, { mongo } from "mongoose";

const formSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  phone:{
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  batch: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
});

const Form = new mongoose.model("Form", formSchema);
export default Form;
