let countDown
const timerDisplay =document.querySelector('.display__time-left');
const endTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countDown)
    const now=Date.now();
    const then=now+seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then)
    countDown = setInterval(()=>{const secondsLeft=Math.round((then-Date.now())/1000)
    if(secondsLeft<0){
    clearInterval(countDown);
    return;
    }
    displayTimeLeft(secondsLeft)
    
},1000)

}
function displayTimeLeft(seconds){
    const minutes=Math.floor(seconds/60);
    const remainderSeconds=seconds%60;
    const display=`${minutes}:${remainderSeconds<10?"0":''}${remainderSeconds}`;
    document.title=display;
    timerDisplay.textContent=display;
}

function displayEndTime(timestamp){
    const end=new Date(timestamp);
    const hrs=end.getHours();
    const mins=end.getMinutes();
    // const hrs=end.getHours();
    endTime.textContent=`Be back at ${hrs>12?hrs-12:hrs}:${mins<10?'0':''}${mins}`;
}
function startTimer(){
    const sec=parseInt(this.dataset.time);
    timer(sec);
}
buttons.forEach((b)=>{
    b.addEventListener('click',startTimer)
})
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins=this.minutes.value;
    console.log(mins);
    timer(mins*60);
    this.reset()
})