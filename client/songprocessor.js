class SongProcessor {
    constructor() {
        this.songs = [];
    }

    // Save the word score to the server
    async getSongBySelections(genre, songvibe, decade) {
        let songSelectionObj = { 'genre': genre, 'songvibe': songvibe, 'decade': decade };
        const response = await fetch(`/selections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(songSelectionObj),
        });
        const data = await response.json();
        this.songs = data;
    }

    render(element) {
        let html = '<h4>Recommended Song List: </h4>';
        html += '<table>';
        let firstFiveSongs = this.songs.slice(0, 5);
        let by = "by";
        for (let i = 0; i < firstFiveSongs.length; ++i) {
            let currentSongName = firstFiveSongs[i]['song'];
            let currentSongArtist = firstFiveSongs[i]['artist'];
            html += `
          <tr>
            <td>${currentSongName}</td>
            <td>${by}</td>
            <td>${currentSongArtist}</td>
          </tr>
        `;
        }
        html += '</table>';
        if (firstFiveSongs.length !== 5) {
            html += "we're updating our recommendations all the time, so stay tuned for more recommendations that fit your interests!";
        }
        element.innerHTML = html;
    }
}

const songProcessorObj = new SongProcessor();

export { songProcessorObj };