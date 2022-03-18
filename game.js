var userClickedPattern = [];
var gamePattern = [];
var currentPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var inGame = false;
var userChosenColour;
var currentLevel;
var highScore = 1;

$(document).keydown(function() {
  if (inGame === false) {
    inGame = true;
    nextSequence();
    $("h1").text("Level " + (level));
    $("h3").text("");
  }
});

  $(".btn").click(function() {
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    currentLevel = userClickedPattern.length;
    checkAnswer(currentLevel);
  })

  function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    gamePattern.forEach((element,i) => {
                setTimeout(
                    function(){
                      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                      playSound(gamePattern[i]);
                    }
                , i * 500);
    });
    level++;

    if (level > highScore){highScore = level;}

  }

  function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColour).removeClass("pressed")
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]) {
      if (currentLevel === level) {
        userClickedPattern = [];
        setTimeout(() => {nextSequence()}, 1000);
        $("h1").text("Level " + (level+1));
      };

    } else {
      playSound("wrong");
      $("h1").text("Game over, press any key to restart");
      $("h2").text("Highscore : Level "+highScore);
      if (highScore>= 10){
        $("h1").text("");
        $("h2").text("");
        $("h3").text("Made especially for Cierra, thank you for being you! ❤️");
        $("body").addClass("us");
        $(".btn").addClass("btn-hide");
        $(".btn").removeClass("btn");
      };
      $("body").addClass("game-over");
      setTimeout(() => {$("body").removeClass("game-over");}, 200);
      startOver()
    };
  }

  function startOver(){
    level = 0;
    inGame = false;
    userClickedPattern = [];
    gamePattern = [];
    currentPattern = [];
  }
