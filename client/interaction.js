import { songProcessorObj } from './songprocessor.js';

console.log("registering event listeners");

let chosenGenre = "";
let chosenSongVibe = "";
let chosenDecade = "";
let dislikeButtonClicks = 0;

// let songProcessorObj = new SongProcessor();

// const songProcessorObj = require('songprocessor');

function renderSelections() {
    let selection = document.getElementById("selections");

    selection.innerText = "You chose: " + chosenGenre + " (genre), " + chosenSongVibe + " (song vibe), " + chosenDecade + " (decade)";
}

async function renderRecommendations() {
    let recommendations = document.getElementById("recommendations");
    console.log("SELECTIONS RIGHT NOW: " + chosenGenre + ",  " + chosenSongVibe + ", " + chosenDecade);
    if (chosenGenre !== "" && chosenSongVibe !== "" && chosenDecade !== "") {

        console.log("QUERYING BACKEND");

        await songProcessorObj.getSongBySelections(chosenGenre, chosenSongVibe, chosenDecade);
        songProcessorObj.render(recommendations, like, dislike, dislikeButtonClicks);

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
    let randomIndex = Math.floor(Math.random() * 3);
    let genres = ["pop", "rap", "alternative"];
    chosenGenre = genres[randomIndex];
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
    let randomIndex = Math.floor(Math.random() * 3);
    let songvibes = ["happy", "sad", "chill"];
    chosenSongVibe = songvibes[randomIndex];
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
    let randomIndex = Math.floor(Math.random() * 3);
    let decades = ["now", "2000s", "2010s"];
    chosenDecade = decades[randomIndex];
    renderSelections();
    renderRecommendations();
});

let like = document.getElementById("like");
like.addEventListener('click', function () {
    console.log("liked the songs");
    alert("happy listening!");
});

let dislike = document.getElementById("dislike");
dislike.addEventListener('click', function () {
    console.log("disliked the songs");
    dislikeButtonClicks += 1;
    console.log("dislike button clicked: " + dislikeButtonClicks);
    renderSelections();
    renderRecommendations();
});