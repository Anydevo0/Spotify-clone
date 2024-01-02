console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Rasiya - from (Brahmashtra)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Baarishein - Anuv Jain", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Tu aake dekhle - King", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Apna bana le - from (Bhediya)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Yadav Brand 2", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Pehla Nasha - LoFi", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Cupid", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Deva Deva - from (Brahmashtra)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Husn - Anuv Jain", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Laung da Lashkara", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})
// audioElement.play();

//Handle Pause/Play
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; 
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('Timeupdate');
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100 ;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            songItemPlay.classList.remove('fa-play-circle');
            songItemPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = "songs/" + songIndex + ".mp3";
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = "songs/" + songIndex + ".mp3";
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play(); 
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 10;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = "songs/" + songIndex + ".mp3";
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play(); 
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})