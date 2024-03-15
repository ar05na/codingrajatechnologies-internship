const audio = new Audio();
let currentTrackIndex = 0;
const playlist = [
  { name: 'Track 1', src: 'track1.mp3' },
  { name: 'Track 2', src: 'track2.mp3' },
  { name: 'Track 3', src: 'track3.mp3' }
];

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeSlider = document.getElementById('volumeSlider');
const playlistElement = document.getElementById('playlist');

function loadTrack(index) {
  audio.src = playlist[index].src;
  audio.play();
}

function updateProgressBar() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playBtn.textContent = 'Play';
  }
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
}

function playPrevious() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
}

function setVolume() {
  audio.volume = volumeSlider.value;
}

playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrevious);
audio.addEventListener('timeupdate', updateProgressBar);
volumeSlider.addEventListener('input', setVolume);

// Populate playlist
playlist.forEach((track, index) => {
  const li = document.createElement('li');
  li.textContent = track.name;
  li.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
  });
  playlistElement.appendChild(li);
});
