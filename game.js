
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$("h1").text("Press A Key to Start");
$(document).keypress(function () {
    // alert('You pressed Enter!');
    if (!gameStarted) {
        nextSecquence();
        gameStarted = true;
        $("#level-title").text("Level " + level + " !");
    }
});

$(".btn").on("click", function () {

    var currBtn = $(this).attr("id");
    userClickedPattern.push(currBtn);
    // console.log(userClickedPattern);
    playSound(currBtn);
    animatePress(currBtn);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSecquence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level + "!");

    var num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[num];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audioPath = "sounds/" + name + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSecquence();
            }, 1000);
        }
    }
    else {
        //console.log("wrong");
        var audioPath = "sounds/wrong.mp3";
        var audio = new Audio(audioPath);
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}