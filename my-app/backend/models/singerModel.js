import mongoose from "mongoose"

const singerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Singer = mongoose.model('Singer', singerSchema);