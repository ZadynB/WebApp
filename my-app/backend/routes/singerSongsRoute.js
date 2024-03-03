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

// route for getting all singer songs
router.get('/', async (request, response) => {
  try {
    const singerSongs = await SingerSong.find({});

    let arr = []
    for (const song of singerSongs) {
      arr.push({
        id: song._id,
        song: song.song,
        author: song.author,
        singer: song.singer,
        key: song.key
      })
    }

    return response.status(200).json({
      count: singerSongs.length,
      data: arr
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting a singer song by Id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const singerSong = await SingerSong.findById(id);

    return response.status(200).json(singerSong);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for updating a singer song
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.singer || !request.body.author || !request.body.song || !request.body.key) {
      return response.status(400).send({
        message: 'Must use all required fields: song name, author, singer and key of song'
      });
    }
    
    const { id } = request.params;
    const result = await SingerSong.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({message: 'service song not found'});
    }

    return response.status(200).send({message: 'updated service song successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for deleting a singer song
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await SingerSong.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({message: 'service song not found'});
    }

    return response.status(200).send({message: 'successfully deleted service song'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;