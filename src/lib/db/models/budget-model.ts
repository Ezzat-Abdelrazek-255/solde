import { Schema, model, models } from "mongoose";

const budgetSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
  remaining: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default models.Budget || model("Budget", budgetSchema);
