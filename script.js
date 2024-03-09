const songData = [
  {
      name: "Jhoome Jo Pathaan",
      artist: "Arijit Singh",
      img:"/image/Pathaan.jpg",
      src: "song4"
  },
  {
    name:"Papa meri jaan",
    artist:"Sonu nigam",
    img:"image/papamerijaan.jpg",
    src:"song2"
  },
  {
    name:"Heeriye",
    artist:"Arijit Singh",
    img:"/image/heeriye.jpg",
    src:"song-1"
  },
  {
    name:"Leke Prabhu Ka Naam",
    artist:"Arijit Singh",
    img:"/image/Tiger-3.jpg",
    src:"song3"
  },
  {
    name:"Akhiyan Gulab",
    artist:"Mitraz",
    img:"/image/Akhiyaan-Gulaab.jpg",
    src:"song5"
  },
  {
    name:"Pal Pal Dil Ke Pass ",
    artist:"Arijit Singh",
    img:"/image/Pal-Pal-Dil-Ke.jpg",
    src:"song6"
  },
  {
    name:"Duniya",
    artist:"Akhil, Dhvani Bhanushali",
    img:"/image/Luka-Chuppi.jpg",
    src:"song7"
  },
  {
    name:"Kamariya",
    artist:"Lijo George, Dj Chetas, Darshan Raval",
    img:"/image/128Kamariya - Mitron 128 Kbps.jpg",
    src:"song8"
  },
  {
    name:"Bom Diggy Diggy",
    artist:"Jasmin Walia, Zack Knight",
    img:"/image/128Bom Diggy Diggy.jpg",
    src:"song9"
  },
  {
    name:"Ghungroo",
    artist:"Arijit Singh, Shilpa Rao",
    img:"/image/128Ghungroo.jpg",
    src:"song10"
  },
  {
    name:"Ghungroo",
    artist:"Arijit Singh, Shilpa Rao",
    img:"/image/128Ghungroo.jpg",
    src:"song10"
  },
  {
    name:" Halamithi Habibo",
    artist:"Anirudh Ravichander",
    img:"/image/beast.webp",
    src:"song11"
  },
  {
    name:"Manohari",
    artist:"Mohana Bhogaraju, Revanth, M. M",
    img:"/image/baahubali.webp",
    src:"song12"
  },
  {
    name:"Kaavaalaa",
    artist:"Shilpa Rao, Anirudh Ravichander",
    img:"/image/jailer.webp",
    src:"song13"
  },
  {
    name:"Aalaporan Thamizhan",
    artist:" Kailash Kher, D. Sathyaprakash, Deepak",
    img:"/image/mersal-2017.webp",
    src:"song14"
  },
  {
    name:"Jimikki Ponnu",
    artist:"Thaman S",
    img:"/image/varisu-tamil-2023.webp",
    src:"song15"
  },
  {
    name:"Alone",
    artist:"Alan Walker",
    img:"image/alone.jpg",
    src:"song16"
  },
];

const container = document.querySelector(".container")
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".song-artist")
const cover = document.querySelector(".cover")
const playPauseBtn = document.querySelector(".play-pause")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const audio = document.querySelector(".audio")
const songTime = document.querySelector(".song-time")
const songProgress = document.querySelector(".song-progress")
const images = document.querySelector(".images")

let songIndex = 0;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

const loadSong = (index) => {
  songName.textContent = songData[index].name;
  songArtist.textContent = songData[index].artist;
  audio.src = `Songs/${songData[index].src}.mp3`;
  images.src = `${songData[index].img}`;
  console.log(songData[index].img)
};

const playSong = () => {
  container.classList.add("pause");
  cover.classList.add("rotate")
  playPauseBtn.firstElementChild.className = "fa fa-pause"; 
  audio.play();
}

const pauseSong = () => {
  container.classList.remove("pause");
  cover.classList.remove("rotate")
  playPauseBtn.firstElementChild.className = "fa fa-play";
  audio.pause();
}

playPauseBtn.addEventListener("click", () => {
  console.log("Button clicked");
  if (container.classList.contains("pause")) {
    pauseSong();
  } else {
    playSong();
  }
});

const prevSongPlay = () => {
  songIndex--;
  if (songIndex < 0) {
      songIndex = songData.length - 1;
  }
   
  loadSong(songIndex);
  playSong();
};

const nextSongPlay = () => {
  songIndex++;
  if (songIndex > songData.length - 1 ) {
      songIndex = 0;
  }
   
  loadSong(songIndex);
  playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);


audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let currentTimeWidth = (currentTime / duration) * 100;
  songProgress.style.width = `${currentTimeWidth}%`;

  let songCurrentTime = document.querySelector(".time span:nth-child(1)");
  let songDuration = document.querySelector(".time span:nth-child(2)");

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
});

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  playSong();
});

audio.addEventListener("ended", nextSongPlay);