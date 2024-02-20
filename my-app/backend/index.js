import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Song } from "./models/songModel.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

// default route
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Worked!');
});

// route for creating a song
app.post('/songs', async (request, response) => {
  try {
    if (!request.body.title || !request.body.songWriter) {
      return response.status(400).send({
        message: 'Must use all required fields: title & songWriter'
      });
    }

    const newSong = {
      title: request.body.title,
      songWriter: request.body.songWriter
    }
    const song = await Song.create(newSong);
    return response.status(201).send(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// route for getting all songs
app.get('/songs', async (request, response) => {
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
app.get('/songs/:id', async (request, response) => {
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
app.put('/songs/:id', async (request, response) => {
  try {
    if (!request.body.title || !request.body.songWriter) {
      return response.status(400).send({
        message: 'Must use all required fields: title & songWriter'
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
app.delete('/songs/:id', async (request, response) => {
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

// connecting to the database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('connected to database.');
    app.listen(PORT, () => {
      console.log("app running at port " + PORT);
    });
  })
  .catch((error) =>{
    console.log(error);
  });