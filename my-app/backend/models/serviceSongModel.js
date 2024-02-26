import mongoose from "mongoose"

const serviceSongSchema = mongoose.Schema(
  {
    parentId: {
      type: String,
      required: true
    },
    song: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    singer: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ServiceSong = mongoose.model('ServiceSong', serviceSongSchema);