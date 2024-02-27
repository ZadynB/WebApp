import express from 'express';
import { Song } from '../models/songModel.js';

const router = express.Router();

// route for creating a song
router.post('/', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.lyrics) {
      return response.status(400).send({
        message: 'Must use all required fields: title, author & lyrics'
      });
    }

    const newSong = {
      title: request.body.title,
      author: request.body.author,
      lyrics: request.body.lyrics
    };
    const song = await Song.create(newSong);
    return response.status(201).send(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for getting all songs
router.get('/', async (request, response) => {
  try {
    const songs = await Song.find({});

    return response.status(200).json({
      count: songs.length,
      data: songs
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for getting a song
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const song = await Song.findById(id);

    return response.status(200).json(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for updating a song
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.lyrics) {
      return response.status(400).send({
        message: 'Must use all required fields: title, author & lyrics'
      });
    }
    
    const { id } = request.params;
    const result = await Song.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({message: 'song not found'});
    }

    return response.status(200).send({message: 'updated song successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for deleting a song
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Song.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({message: 'song not found'});
    }

    return response.status(200).send({message: 'successfully deleted song'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;