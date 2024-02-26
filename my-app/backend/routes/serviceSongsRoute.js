import express from 'express';
import { ServiceSong } from '../models/serviceSongModel.js';

const router = express.Router();

// route for creating a service song
router.post('/', async (request, response) => {
  try {
    if (!request.body.parentId || !request.body.song || !request.body.author || !request.body.singer || !request.body.key) {
      return response.status(400).send({
        message: 'Must use all required fields: parentId, song name, author, singer and key of song'
      });
    }

    const newServiceSong = {
      parentId: request.body.parentId,
      song: request.body.song,
      author: request.body.author,
      singer: request.body.singer,
      key: request.body.key
    }
    const serviceSong = await ServiceSong.create(newServiceSong);
    return response.status(201).send(serviceSong);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting all service songs
router.get('/', async (request, response) => {
  try {
    const serviceSongs = await ServiceSong.find({});

    return response.status(200).json({
      count: serviceSongs.length,
      data: serviceSongs
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting service songs by parentId
router.get('/byParentId', async (request, response) => {
  try {
    const serviceSongs = await ServiceSong.find({parentId: request.body.parentId});

    return response.status(200).json({
      count: serviceSongs.length,
      data: serviceSongs
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting a service song by Id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const serviceSong = await ServiceSong.findById(id);

    return response.status(200).json(serviceSong);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for updating a service song
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.song || !request.body.author || !request.body.singer || !request.body.key) {
      return response.status(400).send({
        message: 'Must use all required fields: song name, author, singer and key of song'
      });
    }
    
    const { id } = request.params;
    const result = await ServiceSong.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({message: 'service song not found'});
    }

    return response.status(200).send({message: 'updated service song successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for deleting a service song
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await ServiceSong.findByIdAndDelete(id);

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