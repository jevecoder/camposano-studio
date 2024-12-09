// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let videoElement = document.getElementById('songVideo');
let videoSource = document.getElementById('videoSource');
let volumeSlider = document.getElementById('volumeSlider');

// Initialize the video size to be hidden initially
videoElement.style.width = "0";
videoElement.style.height = "0";

// Set song list (same as before)
let songs = [
  {songName: "Taylor Swift - Blank Space", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", videoPath: "./video/Taylor Swift - Blank Space.mp4"},
  {songName: "Ed Sheeran - Shape of You", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", videoPath: "./video/Ed Sheeran - Shape of You (Official Music Video).mp4"},
  {songName: "Tones and I - Dance Monkey", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", videoPath: "./video/TONES AND I - DANCE MONKEY (OFFICIAL VIDEO).mp4"},
  {songName: "All Or Nothing - O-Town", filePath: "songs/12.mp3", coverPath: "covers/12.jpg", videoPath: "./video/All Or Nothing - O-Town (Jenzen Guino Cover).mp4"},
  {songName: "Before I Let You Go - Freestyle", filePath: "songs/13.mp3", coverPath: "covers/13.jpg", videoPath: "./video/Before I Let You Go - Freestyle (Jenzen Guino Cover).mp4"},
  {songName: "Crashing - Kyle Juliano  Jenzen Guino", filePath: "songs/14.mp3", coverPath: "covers/14.jpg", videoPath: "./video/Crashing - Kyle Juliano  Jenzen Guino Cover.mp4"},
  {songName: "Hiling - Jay R Siaboc", filePath: "songs/16.mp3", coverPath: "covers/16.jpg", videoPath: "./video/Hiling - Jay R Siaboc (Jenzen Guino Cover).mp4"},
  {songName: "Maybe This Time - Jenzen Guino & Dave Carlos", filePath: "songs/20.mp3", coverPath: "covers/20.jpg", videoPath: "./video/Maybe This Time - Jenzen Guino & Dave Carlos (Cover).mp4"},
  {songName: "Ngiti - Ronnie Liang", filePath: "songs/21.mp3", coverPath: "covers/21.jpg", videoPath: "./video/Ngiti - Ronnie Liang (Jenzen Guino Cover).mp4"},
  {songName: "Only Reminds Me Of You - MYMP", filePath: "songs/23.mp3", coverPath: "covers/23.jpg", videoPath: "./video/Only Reminds Me Of You - MYMP (Jenzen Guino Cover).mp4"},
  {songName: "The Day You Said Goodnight - Hale", filePath: "songs/27.mp3", coverPath: "covers/27.jpg", videoPath: "./video/The Day You Said Goodnight - Hale (Jenzen Guino Cover).mp4"},
  {songName: "This I Promise You - NSYNC", filePath: "songs/28.mp3", coverPath: "covers/28.jpg", videoPath: "./video/This I Promise You - NSYNC (Jenzen Guino Cover).mp4"},
  {songName: "Tuwing Umuulan - Regine Velasquez", filePath: "songs/31.mp3", coverPath: "covers/31.jpg", videoPath: "./video/Tuwing Umuulan - Regine Velasquez (Cover).mp4"},
  {songName: "Dahil Ikaw - Jenzen Guino & Dave Carlos ft. Russell Pangilinan", filePath: "songs/32.mp3", coverPath: "covers/31.jpg", videoPath: "./video/Dahil Ikaw - Jenzen Guino & Dave Carlos ft. Russell Pangilinan (Cover).mp4"},
  {songName: "Dua Lipa - Levitating", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", videoPath: "./video/Dua Lipa - Levitating Featuring DaBaby (Official Music Video).mp4"}
];

// Add the song details dynamically (same as before)
songItems.forEach((element, i) => { 
  element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // Play both audio and video
    audioElement.play();
    videoElement.play();
    videoElement.style.width = "100%";  // Show video size when playing
    videoElement.style.height = "auto";  // Maintain video aspect ratio
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    // Pause both audio and video
    audioElement.pause();
    videoElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Handle progress bar and syncing
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
  videoElement.currentTime = audioElement.currentTime; // Sync video time with audio
});

// Play a specific song from the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    
    // Update song and video
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    videoSource.src = songs[songIndex].videoPath;
    videoElement.load(); // Load the video
    videoElement.play(); // Play the video
    videoElement.style.width = "100%";  // Show video when playing
    videoElement.style.height = "auto";  // Maintain video aspect ratio

    audioElement.currentTime = 0;
    audioElement.play(); // Play the audio
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

// Next/Previous buttons functionality
document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  updateSongAndVideo();
});

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  updateSongAndVideo();
});

// Function to update the song and video when navigating
function updateSongAndVideo() {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  videoSource.src = songs[songIndex].videoPath;
  videoElement.load(); 
  videoElement.play(); // Play the video
  videoElement.style.width = "100%";  // Show video when playing
  videoElement.style.height = "auto";  // Maintain video aspect ratio

  audioElement.currentTime = 0;
  audioElement.play(); // Play the audio
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}
