import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

/** A class representing a database to store scores */
class Database {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();
    await this.init();
  }

  async init() {
    console.log("songs table creation - started");
    const queryText = `CREATE TABLE if not exists songs ( id SERIAL PRIMARY KEY, song VARCHAR(50), genre VARCHAR(50), songvibe VARCHAR(50), decade VARCHAR(50));`;
    const res = await this.client.query(queryText);
    console.log("songs table creation - done");
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  /**
   * Returns the list of songs based on user's choices.
   *
   * This method reads the database file as an object.
   *
   * @returns [{song: string, genre: string, songvibe: string, decade: string}...]
   */
  async songsBasedOnSelections(genre, songvibe, decade) {
    const queryText = 'SELECT song, genre, songvibe, decade FROM songs';
    const res = await this.client.query(queryText);
    let allSongs = JSON.stringify(res.rows);
    allSongs = JSON.parse(allSongs);
    const songsWithSelections = allSongs.filter((songObj) => {
        if (songObj.genre === genre && songObj.songvibe === songvibe && songObj.decade === decade) {
            return true;
        }
        else {
            return false;
        }
    });
    return songsWithSelections;
  }

  
}

const database = new Database(process.env.DATABASE_URL);

export { database };
