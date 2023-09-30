const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const fullscreenButton=player.querySelector('#fullscreen')
function togglePlay(){
    const method=video.paused?'play':'pause';
    video[method]();
}
function updateButton(){
    const icon=this.paused?'►' : '❚ ❚';
    toggle.textContent=icon;
}
function skip(){
    video.currentTime+=parseFloat(this.dataset.skip)
}
function handleRangeUpdate(e){
    video[this.name]=this.value;
}
function handleProgress(e){
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`
}
function scrub(e){
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}
video.addEventListener('timeupdate',handleProgress);
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
toggle.addEventListener('click',togglePlay)
skipButtons.forEach(e=>e.addEventListener('click',skip))
ranges.forEach(e=>e.addEventListener('change',handleRangeUpdate))
// ranges.forEach(e=>e.addEventListener('mousemove',handleRangeUpdate))
let mouseDown=false;
let fullscreen=false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousedown',()=>mouseDown=true)
progress.addEventListener('mouseup',()=>mouseDown=false)
progress.addEventListener('mousemove',(e)=>mouseDown && scrub(e))
function openFullscreen() {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) { /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE11 */
      player.msRequestFullscreen();
    }
  }
function closeFullscreen() {
    if (player.exitFullscreen) {
      player.exitFullscreen();
    } else if (player.webkitExitFullscreen) { /* Safari */
      player.webkitExitFullscreen();
    } else if (player.msExitFullscreen) { /* IE11 */
      player.msExitFullscreen();
    }
    else{
        player.exitFullscreen()    }
  }
fullscreenButton.addEventListener('click',function(){
    

    if(fullscreen){
        fullscreen=false;
        closeFullscreen()
    }
    else{
        openFullscreen();
        fullscreen=true;
    }
})