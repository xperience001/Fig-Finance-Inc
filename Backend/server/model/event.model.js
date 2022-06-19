import mongoose from "mongoose";

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isVirtual: { type: Boolean, default: false },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
