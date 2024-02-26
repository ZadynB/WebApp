import express from 'express';
import { SingerSong } from '../models/singerSongModel.js';

const router = express.Router();

// route for creating a singer song
router.post('/', async (request, response) => {
    try {
      if (!request.body.singer || !request.body.author || !request.body.song || !request.body.key) {
        return response.status(400).send({
          message: 'Must use all required fields: singer, author, song name and key of song'
        });
      }
  
      const newSingerSong = {
        singer: request.body.singer,
        author: request.body.author,
        song: request.body.song,
        key: request.body.key
      };
      const singerSong = await SingerSong.create(newSingerSong);
      return response.status(201).send(singerSong);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

export default router;