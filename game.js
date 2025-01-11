var buttonColour = ["red","blue","green","yellow"]

var gamePattern = [];
var userClickedPattern = [];

var lvl = 0;
var start = false;
var iterate = 0;

  $(document).keypress(function(){
    if(!start){
      nextSequence();
      start = true;
    }
  });

  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playsound(userChosenColour);
    var userarrnum = userClickedPattern.length -1;
    checkAnswer(userarrnum);
    animatePress(userChosenColour);
  });


function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosencolour = buttonColour[randomNumber];
  gamePattern.push(randomChosencolour);
  $("#"+randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosencolour);
  lvl +=1;
  var level = "level "+lvl;
  $("#level-title").text(level);
}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed") ;
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },300)
}

function checkAnswer(value){
    if(userClickedPattern[value] == gamePattern[iterate]){
      console.log("success");
      iterate+=1;
      if(iterate == gamePattern.length){
        setTimeout(nextSequence,1000);
        iterate = 0;
      }
    }
    else{
      console.log("failure");
      playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").toggleClass("game-over")
      },200)
      $("h1").text("Game Over, Press Any Key to Restart");
      startover();
    }
}
function startover(){
  lvl=0;
  iterate=0;
  gamePattern=[];
  start = false;
}
