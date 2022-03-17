var userClickedPattern = [];
var gamePattern = [];
var currentPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var inGame = false;
var userChosenColour;
var currentLevel;

if (inGame === false) {
  $(document).keydown(function() {
    nextSequence();
    $("h1").text("Level " + (level));
    inGame = true;
    console.log(inGame);
  })
};

  $(".btn").click(function() {
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    currentLevel = userClickedPattern.length;
    console.log(gamePattern[currentLevel-1]);
    console.log(userClickedPattern[currentLevel-1]);
    checkAnswer(currentLevel);
  })

  function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
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
    console.log(inGame);
  }
