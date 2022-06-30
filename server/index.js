import chalkAnimation from 'chalk-animation';
// import { database } from './database.js';
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

// Implement the /wordScore endpoint
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
    response.status(200).json({ 'status': 'success' });
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

// await database.connect();

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
