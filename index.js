const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
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
        console.log('aaa');
        currentTimeGlobal = audio.currentTime;
        const progressNum = audio.currentTime / audio.duration * 100;
        progress.style.width = progressNum + '%';
    }, 1000);
}

function stopProgress() {
    if(interval) clearInterval(interval);
    interval = null;
}