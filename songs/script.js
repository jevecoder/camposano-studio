
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeSlider = document.getElementById('volumeSlider');

// Set the initial volume based on the volume slider value
audioElement.volume = volumeSlider.value;  // Set initial volume to the slider's value

// Event listener to update the volume when the slider changes
volumeSlider.addEventListener('input', () => {
  audioElement.volume = volumeSlider.value;  // Update the audio volume
});

let songs = [
    {songName: "Taylor swift- Blank space", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ED Shereen - Shape of you", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Tones and I - Dance monkey", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Dua Lipa - Levetating", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "AR Rahman violin music", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Animal - sari duniya ", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Kabir singh - bekhayali", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Mustafa mustafa - telugu", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Em sandeham ledu - telugu", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Nee kalli neeli", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "All I Ever Need - Austin Mahone", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "All Or Nothing - O-Town", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Before I Let You Go - Freestyle", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Crashing - Kyle Juliano  Jenzen Guino", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Wiz Khalifa - Roll Up", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Hiling - Jay R Siaboc", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Kahit Kailan - South Border", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Kailangan Kita- Gary Valenciano", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Mahal Pa Rin Kita - Rockstar", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
    {songName: "Maybe This Time - Jenzen Guino & Dave Carlos", filePath: "songs/20.mp3", coverPath: "covers/20.jpg"},
    {songName: "Ngiti - Ronnie Liang", filePath: "songs/21.mp3", coverPath: "covers/21.jpg"},
    {songName: "Night Changes - One Direction", filePath: "songs/22.mp3", coverPath: "covers/22.jpg"},
    {songName: "Only Reminds Me Of You - MYMP", filePath: "songs/23.mp3", coverPath: "covers/23.jpg"},
    {songName: "Pasensya Ka Na - Silent Sanctuary", filePath: "songs/24.mp3", coverPath: "covers/24.jpg"},
    {songName: "Snoop Dogg & Wiz Khalifa", filePath: "songs/25.mp3", coverPath: "covers/25.jpg"},
    {songName: "Statue - Lil Eddie", filePath: "songs/26.mp3", coverPath: "covers/26.jpg"},
    {songName: "The Day You Said Goodnight - Hale", filePath: "songs/27.mp3", coverPath: "covers/27.jpg"},
    {songName: "This I Promise You - NSYNC", filePath: "songs/28.mp3", coverPath: "covers/28.jpg"},
    {songName: "Through the Years - Kenny Rogers", filePath: "songs/29.mp3", coverPath: "covers/29.jpg"},
    {songName: "Tuwing Umuulan - Regine Velasquez", filePath: "songs/31.mp3", coverPath: "covers/30.jpg"},
]

// Populate the song items dynamically
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play().catch(error => {
            console.error("Audio play error:", error);
            alert("Failed to play the audio. Please check the audio format or file path.");
        });
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to time update event
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

// Change audio current time based on progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play icons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play song when clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;

        console.log(audioElement.src);


        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
            console.error("Audio play error:", error);
            alert("Failed to play the audio. Please check the audio format or file path.");
        });
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next button functionality
document.getElementById('next').addEventListener('click', () => {
    songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.error("Audio play error:", error);
        alert("Failed to play the audio. Please check the audio format or file path.");
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous button functionality
document.getElementById('previous').addEventListener('click', () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.error("Audio play error:", error);
        alert("Failed to play the audio. Please check the audio format or file path.");
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});