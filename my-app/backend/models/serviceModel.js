import mongoose from "mongoose"

const serviceSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    worshipLeader: {
      type: String,
      required: true
    },
    numSongs: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Service = mongoose.model('Service', serviceSchema);