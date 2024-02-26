import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import songsRoute from './routes/songsRoute.js';
import servicesRoute from './routes/servicesRoute.js';
import serviceSongsRoute from './routes/serviceSongsRoute.js';
import singerSong from "./routes/singerSongsRoute.js";
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
app.use(cors());
// app.use(cors({
//   'origin': 'http://localhost:3000',
//   'methods': ['GET', 'POST', 'PUT', 'DELETE'],
//   'allowedHeaders': ['Content-Type']
// }));

// default route
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Worked!');
});

// middleware for the songs routes
app.use('/songs', songsRoute);
app.use('/services', servicesRoute);
app.use('/serviceSongs', serviceSongsRoute);
app.use('/singerSongs', singerSong);

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