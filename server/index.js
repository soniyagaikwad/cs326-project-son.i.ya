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
