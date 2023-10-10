import mongoose from "mongoose";

const { Schema } = mongoose;

const urlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    surl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Url || mongoose.model("Url", urlSchema);
