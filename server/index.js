import chalkAnimation from 'chalk-animation';
import { database } from './database.js';
// Import Morgan and Express
import express from 'express';
import logger from 'morgan';

// Create an Express app.
const app = express();
const port = process.env.PORT || 3000;

// Add middleware to the Express app.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));



// implementation for starting up
app.get('/hello', async (request, response) => {
    const options = request.body;
    response.status(200).json({ 'status': 'success' });
});

// implementation for genre
app.post('/genre', async (request, response) => {
    const options = request.body;
    // await database.saveWordScore(options.name, options.word, options.score);
    console.log("User selected the " + options.genre + " genre!");
    response.status(200).json({ 'status': 'success' });
});

// implementation for song-vibe
app.post('/songvibe', async (request, response) => {
    const options = request.body;
    // await database.saveWordScore(options.name, options.word, options.score);
    console.log("User selected the " + options.songvibe + " song vibe!");
    response.status(200).json({ 'status': 'success' });
});

// implementation for decade
app.post('/decade', async (request, response) => {
    const options = request.body;
    // await database.saveWordScore(options.name, options.word, options.score);
    console.log("User selected the " + options.decade + " decade!");
    response.status(200).json({ 'status': 'success' });
});

// implementation for selections
app.post('/selections', async (request, response) => {
    const options = request.body;
    // await database.saveWordScore(options.name, options.word, options.score);
    console.log("User selected the following: " + options.genre + ", " + options.songvibe + ", and " + options.decade + "!");
    let songRecommendations = await database.songsBasedOnSelections(options.genre, options.songvibe, options.decade);
    response.status(200).json(songRecommendations);
});

// implementation for getting all songs
app.post('/getAllSongs', async (request, response) => {
    const options = request.body;
    let songsList = await database.getAllSongs();
    response.status(200).json(songsList);
});

// implementation for adding a song
app.post('/addSong', async (request, response) => {
    const options = request.body;
    let createdSong = await database.createSong(options.song, options.artist, options.genre, options.songvibe, options.decade);
    console.log("added the song: " + options.song);
    response.status(200).json(createdSong);
});

// implementation for reading a song
app.post('/readSong', async (request, response) => {
    const options = request.body;
    let readingSong = await database.readSong(options.song);
    console.log("song description: " + readingSong.song + ", " + readingSong.artist + ", " + readingSong.genre + ", " + readingSong.songvibe + ", " + readingSong.decade);
    response.status(200).json(readingSong);
});

// implementation for updating a song
app.post('/updateSong', async (request, response) => {
    const options = request.body;
    let updatedSong = await database.updateSong(options.song, options.artist, options.genre, options.songvibe, options.decade);
    console.log("updated the song: " + options.song);
    response.status(200).json(updatedSong);
});

// implementation for deleting a song
app.delete('/deleteSong', async (request, response) => {
    const options = request.body;
    let deletedSong = await database.readSong(options.song);
    console.log("deleted song: " + options.song);
    response.status(200).json(deletedSong);
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

console.log("BEFORE DB CONNECT");
await database.connect();
console.log("AFTER DB CONNECT");

// Start the server.
app.listen(port, () => {
    // This is totally just for fun!
    const banner = `
███╗   ███╗  ██╗   ██╗  ███████╗  ███████╗  ███████╗
████╗ ████║  ██║   ██║  ██╔════╝  ██╔════╝  ██╔════╝
██╔████╔██║  ██║   ██║  ███████╗  █████╗    ███████╗
██║╚██╔╝██║  ██║   ██║  ╚════██║  ██╔══╝    ╚════██║
██║ ╚═╝ ██║  ╚██████╔╝  ███████║  ███████╗  ███████║
╚═╝     ╚═╝   ╚═════╝   ╚══════╝  ╚══════╝  ╚══════╝
                                                                                                                  
`;
    const msg = `${banner}\n     Server started on http://localhost:${port}`;
    const rainbow = chalkAnimation.rainbow(msg);

    // Have the rainbow stop so we can log stuff to the console.
    setTimeout(() => {
        rainbow.stop(); // Animation stops
    }, 2000);
});
