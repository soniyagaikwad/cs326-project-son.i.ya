import { songProcessorObj } from './songprocessor.js';

console.log("registering event listeners");

let chosenGenre = "";
let chosenSongVibe = "";
let chosenDecade = "";

// let songProcessorObj = new SongProcessor();

// const songProcessorObj = require('songprocessor');

function renderSelections() {
    let selection = document.getElementById("selections");

    selection.innerText = "You chose: " + chosenGenre + " (genre), " + chosenSongVibe + " (song vibe), " + chosenDecade + " (decade)";
}

function renderRecommendations() {
    let recommendations = document.getElementById("recommendations");
    if (chosenGenre !== "" && chosenSongVibe !== "" && chosenDecade !== "") {

        songProcessorObj.getSongBySelections(chosenGenre, chosenSongVibe, chosenDecade);
        songProcessorObj.render(recommendations);

        // recommendations.innerText = "Recommended Song List: \n 1. SONG #1 \n 2. SONG #2 \n 3. SONG #3 \n 4. SONG #4 \n 5. SONG #5";
        
        // const like = document.createElement('div');
        // like.classList.add('thumbsup');
        // like.innerText = "thumbs up     -----     thumbs down";
        // recommendations.appendChild(like);
    }
}

let pop = document.getElementById("genre1");
pop.addEventListener('click', function () {
    chosenGenre = "pop";
    console.log("chosen genre: " + chosenGenre);
    renderSelections();
    renderRecommendations();
});

let rap = document.getElementById("genre2");
rap.addEventListener('click', function () {
    chosenGenre = "rap";
    console.log("chosen genre: " + chosenGenre);
    renderSelections();
    renderRecommendations();
});

let alternative = document.getElementById("genre3");
alternative.addEventListener('click', function () {
    chosenGenre = "alternative";
    console.log("chosen genre: " + chosenGenre);
    renderSelections();
    renderRecommendations();
});

let randomGenre = document.getElementById("genre4");
randomGenre.addEventListener('click', function () {
    chosenGenre = "random";
    console.log("chosen genre: " + chosenGenre);
    renderSelections();
    renderRecommendations();
});

let happy = document.getElementById("song-vibe1");
happy.addEventListener('click', function () {
    chosenSongVibe = "happy";
    console.log("chosen song vibe: " + chosenSongVibe);
    renderSelections();
    renderRecommendations();
});

let sad = document.getElementById("song-vibe2");
sad.addEventListener('click', function () {
    chosenSongVibe = "sad";
    console.log("chosen song vibe: " + chosenSongVibe);
    renderSelections();
    renderRecommendations();
});

let chill = document.getElementById("song-vibe3");
chill.addEventListener('click', function () {
    chosenSongVibe = "chill";
    console.log("chosen song vibe: " + chosenSongVibe);
    renderSelections();
    renderRecommendations();
});

let randomSongVibe = document.getElementById("song-vibe4");
randomSongVibe.addEventListener('click', function () {
    chosenSongVibe = "random";
    console.log("chosen song vibe: " + chosenSongVibe);
    renderSelections();
    renderRecommendations();
});

let current = document.getElementById("decade1");
current.addEventListener('click', function () {
    chosenDecade = "now";
    console.log("chosen decade: " + chosenDecade);
    renderSelections();
    renderRecommendations();
});

let y2k = document.getElementById("decade2");
y2k.addEventListener('click', function () {
    chosenDecade = "2000s";
    console.log("chosen decade: " + chosenDecade);
    renderSelections();
    renderRecommendations();
});

let y2k10s = document.getElementById("decade3");
y2k10s.addEventListener('click', function () {
    chosenDecade = "2010s";
    console.log("chosen decade: " + chosenDecade);
    renderSelections();
    renderRecommendations();
});

let randomYear = document.getElementById("decade4");
randomYear.addEventListener('click', function () {
    chosenDecade = "random";
    console.log("chosen decade: " + chosenDecade);
    renderSelections();
    renderRecommendations();
});

