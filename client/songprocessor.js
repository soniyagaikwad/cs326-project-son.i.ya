class SongProcessor {
    constructor() {
        this.songs = [];
    }

    // Save the word score to the server
    async getSongBySelections(genre, word, score) {
        let songSelectionObj = { 'genre': genre, 'word': word, 'score': score };
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
        for (let i = 0; i < firstFiveSongs.length; ++i) {
            html += `
          <tr>
            <td>${firstFiveSongs[i].name}</td>
            <td>${firstFiveSongs[i].artist}</td>
          </tr>
        `;
        }
        html += '</table>';
        element.innerHTML = html;
    }
}