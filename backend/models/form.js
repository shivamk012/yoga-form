import mongoose, { mongo } from "mongoose";

const formSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  payment: {
    type: Boolean,
  },
});

const Form = new mongoose.model("Form", formSchema);
export default Form;
