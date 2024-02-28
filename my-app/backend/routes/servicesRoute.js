import express from 'express';
import { Service } from '../models/serviceModel.js';

const router = express.Router();

// route for creating a service
router.post('/', async (request, response) => {
  try {
    if (!request.body.date || !request.body.worshipLeader ) {
      return response.status(400).send({
        message: 'Must use all required fields: date and worship leader'
      });
    }

    const newService = {
      date: request.body.date,
      worshipLeader: request.body.worshipLeader,
      numSongs: 0
    };
    const service = await Service.create(newService);
    return response.status(201).send(service);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting all services
router.get('/', async (request, response) => {
  try {
    const services = await Service.find({});

    let arr = [];
    for (const service of services) {
      let dateStr = '';
      
      // concatenating month string
      if ((service.date.getMonth() + 1).toString().length > 1 ) {
        dateStr = service.date.getFullYear().toString() + '-' + (service.date.getMonth() + 1).toString();
      } else {
        dateStr = service.date.getFullYear().toString() + '-0' + (service.date.getMonth() + 1).toString();
      }

      //concatenating date string
      if (service.date.getDate().toString().length > 1) {
        dateStr = dateStr + '-' + service.date.getDate().toString();
      } else {
        dateStr = dateStr + '-0' + service.date.getDate().toString();
      }

      arr.push({
        id: service._id,
        date: dateStr,
        worshipLeader: service.worshipLeader,
        numSongs: service.numSongs
      });
    }

    return response.status(200).json({
      count: services.length,
      data: arr
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting a service
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const service = await Service.findById(id);

    return response.status(200).json(service);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for updating a service
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.date || !request.body.worshipLeader) {
      return response.status(400).send({
        message: 'Must use all required fields: date and worship leader'
      });
    }
    
    const { id } = request.params;
    const result = await Service.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({message: 'service not found'});
    }

    return response.status(200).send({message: 'updated service successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for deleting a service
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Service.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({message: 'service not found'});
    }

    return response.status(200).send({message: 'successfully deleted service'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;