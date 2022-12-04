const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const incValueBtn = document.getElementById('inc_volume');
const decValueBtn = document.getElementById('dec_volume');
const valValueBtn = document.getElementById('volume-val');
const audio = document.getElementById('audio');
const progress = document.querySelector('.progress-bar');
let isPlaying = false;
let currentSong = 0;
let interval = null;
let currentTimeGlobal = 0;
const audios = [
    "./audio/example-1.mp3",
    "./audio/example-2.mp3",
    "./audio/example-3.mp3",
];

playBtn.addEventListener('click', () => {
    if(isPlaying) pause(); else play();
});
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
incValueBtn.addEventListener('click', incValue);
decValueBtn.addEventListener('click', decValue);

function incValue() {
    let volume = audio.volume;
    if(volume + 0.1 >= 1) volume = 1; else volume += 0.1;
    audio.volume = volume;
    valValueBtn.innerHTML = Math.round(volume * 100);
}

function decValue() {
    let volume = audio.volume;
    if(volume - 0.1 <= 0) volume = 0; else volume -= 0.1;
    audio.volume = volume;
    valValueBtn.innerHTML = Math.round(volume * 100);
}

function play(clearTime = false) {
    isPlaying = true;
    playBtn.innerHTML = '⏸';
    audio.setAttribute('src', audios[currentSong]);
    if(clearTime) progress.style.width = '0%';
    startProgress(clearTime ? 0 : currentTimeGlobal);
    audio.play();
}

function pause() {
    isPlaying = false;
    stopProgress();
    playBtn.innerHTML = '▶️';
    audio.pause();
}

function next() {
    if(currentSong + 1 <= audios.length - 1) 
        currentSong++; else 
        currentSong = 0;
    play(true);
}

function prev() {
    if(currentSong - 1 >= 0) 
        currentSong--; else 
        currentSong = audios.length - 1;
    play(true);
}

function startProgress(currentTime = 0) {
    if(currentTime !== 0) audio.currentTime = currentTime;
    interval = setInterval(() => {
        currentTimeGlobal = audio.currentTime;
        const progressNum = audio.currentTime / audio.duration * 100;
        progress.style.width = progressNum + '%';
    }, 1000);
}

function stopProgress() {
    if(interval) clearInterval(interval);
    interval = null;
}