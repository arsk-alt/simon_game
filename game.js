
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let randomNumber;
let randomChosenColor;
let level = 0;
let gameStarted = false;

let nextSequenceInterrupt;

$(document).keypress(function(event){
  if((event.key === "a" || event.key === "ф") && !gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }

});

$(document).click(function(event){
  if((!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function(event){
  let userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      nextSequenceInterrupt = setTimeout(nextSequence, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
      startOver();
    }, 1000);

    if (nextSequenceInterrupt){
      clearTimeout(nextSequenceInterrupt);
      nextSequenceInterrupt = null;
      // console.log(nextSequenceInterrupt);
    }
    $("h1").text("Game over, press A key to Restart");
  }
}

function nextSequence(){
  userClickedPattern = [];
  randomNumber =  Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.1;
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
