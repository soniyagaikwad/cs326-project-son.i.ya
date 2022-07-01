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
        const queryText = `CREATE TABLE if not exists songs ( id SERIAL PRIMARY KEY, song VARCHAR(100), artist VARCHAR(50), genre VARCHAR(50), songvibe VARCHAR(50), decade VARCHAR(50));`;
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
     * @returns [{song: string, artist: string, genre: string, songvibe: string, decade: string}...]
     */
    async songsBasedOnSelections(genre, songvibe, decade) {
        const queryText = 'SELECT song, artist, genre, songvibe, decade FROM songs';
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

    async getAllSongs() {
        const queryText = 'SELECT song, artist, genre, songvibe, decade FROM songs';
        const res = await this.client.query(queryText);
        let allSongs = JSON.stringify(res.rows);
        allSongs = JSON.parse(allSongs);
        return allSongs;
    }

    // async songsBasedOnSelectionsSTATIC(genre, songvibe, decade) {
    //     const songsWithSelections = [{ "song": "you right", "artist": "doja cat", "genre": "pop", "songvibe": "happy", "decade": "now" }, { "song": "glimpse of us", "artist": "joji", "genre": "pop", "songvibe": "sad", "decade": "now" }];
    //     return songsWithSelections;
    // }

    // create (C)
    async createSong(song, artist, genre, songvibe, decade) {
        const queryText = 'INSERT INTO songs (song, artist, genre, songvibe, decade) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const res = await this.client.query(queryText, [song, artist, genre, songvibe, decade]);
        return res.rows;
    }

    // read (R)
    async readSong(song) {
        const queryText = 'SELECT song, artist, genre, songvibe, decade FROM songs WHERE song = $1';
        const res = await this.client.query(queryText, [song]);
        let foundSong = JSON.stringify(res.rows);
        foundSong = JSON.parse(foundSong);
        return foundSong;
    }

    // update (U)
    async updateSong(song, artist, genre, songvibe, decade) {
        const queryText = 'UPDATE songs set song = $1, artist = $2, genre = $3, songvibe = $4, decade = $5 WHERE song = $1';
        const res = await this.client.query(queryText, [song, artist, genre, songvibe, decade]);
        let updatedSong = JSON.stringify(res.rows);
        updatedSong = JSON.parse(updatedSong);
        return updatedSong;
    }

    // delete (D)
    async deleteSong(song) {
        const queryText = 'DELETE FROM songs WHERE song = $1';
        const res = await this.client.query(queryText, [song]);
        let deletedSong = JSON.stringify(res.rows);
        deletedSong = JSON.parse(deletedSong);
        return deletedSong;
    }




}

const database = new Database(process.env.DATABASE_URL);

export { database };
