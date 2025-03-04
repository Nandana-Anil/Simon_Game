var buttonColors=['red','blue','green','yellow'];
var pattern=[];
var userpattern=[];
var started=0;
var level=0;

$(document).keydown(function(){
    if(started===0){
        //display level
        $('h1').text('Level '+level);
        nxtseq();
        started=1;
    }
});

$('.btn').on('click',function(event) {
    var chosenclr=event.currentTarget.id;
    playSound(chosenclr);
    animatePress(chosenclr);
    userpattern.push(chosenclr);
    checkAnswer(userpattern.length-1);
});

function nxtseq(){
    userpattern=[];
    level+=1;
    $('h1').text('Level '+level);
    var randno=Math.floor(Math.random()*4);
    var randclr=buttonColors[randno];
    console.log(randclr);
    pattern.push(randclr);
    $('#'+randclr).fadeIn(100).fadeOut(100).fadeIn(100); //random button flash
    playSound(randclr);
}

function playSound(name){
    //audio play
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currColor){
    $('#'+currColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currColor).removeClass('pressed');
    },100);
}

function checkAnswer(currlevel){
    if (userpattern[currlevel]===pattern[currlevel]){
        console.log('correct');
        if(userpattern.length===pattern.length){
            setTimeout(function(){
                nxtseq();
            },1000);
        }
    }
    else{
        console.log('wrong');
        var wrongaud=new Audio('sounds/wrong.mp3');
        wrongaud.play();
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('h1').text('Game Over, Press any Key to Restart');
        startOver();
    }
}

function startOver()
{
    level=0;
    started=0;
    pattern=[];
}

