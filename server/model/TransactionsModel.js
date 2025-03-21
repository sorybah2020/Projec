import mongoose from "mongoose";

const TrancationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  cashflow: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Transcations = mongoose.model("Transactions", TrancationsSchema);
export default Transcations;
