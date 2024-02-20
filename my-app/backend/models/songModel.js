import mongoose from "mongoose"

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    songWriter: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Song = mongoose.model('Song', songSchema);