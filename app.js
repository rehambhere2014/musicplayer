const play = document.getElementById('play');
const container = document.getElementById('container')
const audio = document.getElementById('audio');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const circle = document.querySelector('.circle');
const progress = document.getElementById('progress');
const progress_container = document.getElementById('progress-container')


let songs = ['hey','summer','adeal','selean']
let songIndex = 3;


const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
function animationPralex(){
    circle.className = 'circle grow';
  
    setTimeout(() => {
  
      setTimeout(() => {
        circle.className = 'circle shrink';
      }, holdTime);
    }, breatheTime);

}



function  loadSongs(song){
    title.innerText = `${song}Song`;
    audio.src = `./music/${song}.mp3`;
    
    cover.src = `./images/${song}.jpg`

}
loadSongs(songs[songIndex]);

function  playMusic(){
    container.classList.add('show')
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    setInterval(animationPralex,totalTime)
    audio.play();

    }

    function stopMusic(){
       container.classList.remove('show');
       play.querySelector('i.fas').classList.add('fa-play');
       play.querySelector('i.fas').classList.remove('fa-pause');
      clearInterval(animationPralex)
       audio.pause();

     
        }

      ;

play.addEventListener('click',()=>{
    const isPlaying=container.classList.contains('show');

    if(isPlaying){
        stopMusic();
    }else{
        playMusic();
    }
})

function prevSong(){
songIndex--;
if(songIndex<0){
    songIndex = songs.length-1
}
loadSongs(songs[songIndex]);
playMusic();

}
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0
    }
    loadSongs(songs[songIndex]);
    playMusic();
    
    }

    function updateProgress(e){
const {duration,currentTime} = e.srcElement;
const progressPers = (currentTime/duration)*100;
progress.style.width=`${progressPers}%`


    }

    function setProgress(e){
        console.log(e)
        const clickX = e.offsetX;
        const duration = audio.duration;
        const width = progress_container.clientWidth;
        audio.currentTime= (clickX / width)*duration


    }
prev.addEventListener('click',prevSong);
next.addEventListener('click',nextSong);
audio.addEventListener('ended',nextSong);

audio.addEventListener('timeupdate',updateProgress);
progress_container.addEventListener('click',setProgress)
