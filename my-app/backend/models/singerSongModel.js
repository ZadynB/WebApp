import mongoose from "mongoose"

const singerSongSchema = mongoose.Schema(
  {
    singer: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    song: {
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

export const SingerSong = mongoose.model('SingerSong', singerSongSchema);