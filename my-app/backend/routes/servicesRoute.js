import express from 'express';
import { Service } from '../models/serviceModel.js';

const router = express.Router();

// route for creating a service
router.post('/', async (request, response) => {
  try {
    if (!request.body.date || !request.body.worshipLeader || !request.body.numSongs) {
      return response.status(400).send({
        message: 'Must use all required fields: name, worship leader and number of songs'
      });
    }

    const newService = {
      date: request.body.date,
      worshipLeader: request.body.worshipLeader,
      numSongs: request.body.numSongs
    }
    const service = await Service.create(newService);
    return response.status(201).send(service);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;