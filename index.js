const audioLayout = createNewAudioLayout();
document.querySelector('.testAudioWrapper').innerHTML = '';
document.querySelector('.testAudioWrapper').appendChild(audioLayout);

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

function createNewAudioLayout() {
    const result = document.createElement('div');
    result.classList.add('audio-wrapper');

    const controls = document.createElement('div');
    controls.classList.add('controls');

    const audio = document.createElement('audio');
    audio.setAttribute('id', 'audio');
    audio.setAttribute('src', './audio/example-1.mp3');

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const volume = document.createElement('div');
    volume.classList.add('volume');

    const progress = document.createElement('div');
    progress.classList.add('progress');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    const image = document.createElement('img');
    image.src = './images/snowflake.png';

    progressBar.appendChild(image);
    progress.appendChild(progressBar);

    [{name: 'prev'}, {name: 'play'}, {name: 'next'}].forEach(value => {
        const btn = document.createElement('button');
        btn.setAttribute('id', value.name);
        buttons.appendChild(btn);
    });

    const inc_volumeBtn = document.createElement('button');
    inc_volumeBtn.setAttribute('id', 'inc_volume');
    inc_volumeBtn.innerHTML = '+';
    volume.appendChild(inc_volumeBtn);

    const volumeValBtn = document.createElement('label');
    volumeValBtn.setAttribute('id', 'volume-val');
    volumeValBtn.innerHTML = '100';
    volume.appendChild(volumeValBtn);

    const dec_volumeBtn = document.createElement('button');
    dec_volumeBtn.setAttribute('id', 'dec_volume');
    dec_volumeBtn.innerHTML = '-';
    volume.appendChild(dec_volumeBtn);

    controls.appendChild(buttons);
    controls.appendChild(volume);
    controls.appendChild(progress);
    result.appendChild(controls);
    result.appendChild(audio);

    return result
}