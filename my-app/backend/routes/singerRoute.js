import express from 'express';
import { Singer } from '../models/singerModel.js';

const router = express.Router();

// route for creating a singer
router.post('/', async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: 'Must enter a name!'
      });
    }

    const newSinger = {
      name: request.body.name
    };
    const singer = await Singer.create(newSinger);
    return response.status(201).send(singer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for getting all singers
router.get('/', async (request, response) => {
  try {
    const singers = await Singer.find({});

    let arr = []
    for (const singer of singers) {
      arr.push({
        id: singer._id,
        name: singer.name,
      })
    }

    return response.status(200).json({
      count: singers.length,
      data: arr
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
    const singer = await Singer.findById(id);

    return response.status(200).json(singer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for updating a song
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: 'Must enter a name!'
      });
    }
    
    const { id } = request.params;
    const result = await Singer.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({message: 'singer not found'});
    }

    return response.status(200).send({message: 'updated singer successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
// route for deleting a singer
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Singer.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({message: 'singer not found'});
    }

    return response.status(200).send({message: 'successfully deleted singer'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;