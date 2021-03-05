document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= window.innerHeight) {
    //horizontal
  } else if (window.innerWidth < window.innerHeight) {
    //vertical
  }

  //setting starting index
  currentIndex = 3;

  atTutorial = true;
});

window.addEventListener("load", function () {
  started = false;
  rightAfterStart = false;
  atSettingsMenu = false;

  actualLanguageNum = 2;

  if (mainLanguage == "CH") {
    tickMark = "O";
  } else {
    tickMark = "✓";
  }
  var items = document.querySelectorAll(".items");
  for (let i = 0; i < items.length; i++) {
    if (i < 3) {
      items[i].innerHTML = "";
    }
  }

  this.document.getElementById("bImg").src = "_assets/playBtn.png";

  $("#objective").text(allGreetingsTxts[actualLanguageNum]);

  $("#progressionSoFar").text(levelLeftAt.toString() + "/35");
  $("#wrapper").text(" Welcome to Numbers Pop!\nNice. ");

  movesLeftFeedback();

  //starter interval

  document.getElementById("tutorialPanel").style.display = "block";
});

function startScreen() {
  startedGameNowUnique = true;
  document.getElementById("bImg").src = "_assets/Empty.png";
  levelControl();

  currentIndex = 1;
}

let atTutorial = true;
function tutorialWalkthrough() {}

let actualLanguageNum = -1;
function changeLanguage() {
  var al = actualLanguageNum;
  al++;
  actualLanguageNum = al;

  console.log("lingua: " + actualLanguageNum);
  if (actualLanguageNum <= allLanguages.length - 1) {
    mainLanguage = allLanguages[actualLanguageNum];
  } else {
    actualLanguageNum = 0;
    mainLanguage = allLanguages[actualLanguageNum];
  }

  if (mainLanguage == "CH") {
    tickMark = "O";
  } else {
    tickMark = "✓";
  }

  $("#objective").text(mainLanguage);
}

const allLanguages = ["FR", "DE", "EN", "ES", "CH", "IN", "SW"];
const allNextTxts = [
  " Prochain: ",
  " Nächster: ",
  " Next: ",
  " Siguente: ",
  " 下一个 ",
  " आगामी ",
  " Ijayo ",
];
const allGameOverTxts = [
  "Jeu Terminé",
  "Spiel Vorbei",
  "Game Over",
  "Juego Terminado",
  "游戏结束",
  "खेल खत्म",
  "Mchezo Mwisho",
];
const allGreetingsTxts = [
  "Bonjour!",
  "Hallo!",
  "Hello!",
  "¡Hola!",
  "你好",
  "नमस्ते",
  "Hujambo",
];

let mainLanguage = "en/UK";
let tickMark = "O";

let startingValue = 1;
let levelLeftAt = 0;
let levelObjectiveNumber = 0;
let maxLevelsNow = 7;
var resetOn = false;
function levelControl() {
  if (resetOn == true) {
    clearResetLevel();
  } else {
    randomLevelBuildr();
    //show progression
    document.getElementById(
      "progressionSoFar"
    ).style.maxWidth = computeProgression();
  }

  //save high score
  localStorage["highScoreKey"] = levelLeftAt.toString();

  skipMidBtns = true;

  //useful reset.
  wonGame = false;

  $("#CC").text("C");

  $("#show-input").text(startingValue.toString());
  $("#objective").text(levelObjectiveNumber.toString()); // maybe arrow symbol: ←

  movesLeftFeedback();
}

function movesLeftFeedback() {
  $(".movesDots").each(function (i) {
    if (i < movesLeftNumber) {
      $(this).animate(
        {
          opacity: "1.0",
        },
        "fast"
      );
    } else {
      $(this).animate(
        {
          opacity: "0.1",
        },
        "fast"
      );
    }
  });
}

function levelOneBtnDisables() {
  if (atSettingsMenu == true) {
    $("#d").text(" ");
    $("#b").text(" ");
    $("#c").text(" ");
  }
}

function computeProgression() {
  //the max is 35 (100%), after that the progress bar doesn't appear
  $("#progressionSoFar").text(levelLeftAt.toString() + "/35");
  let progressNow = 0;
  if (levelLeftAt <= 35) {
    progressNow = (100 / 35) * levelLeftAt;
    return progressNow.toString() + "%";
  } else {
  }
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// need to insert an array of colors
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

document.activeElement.addEventListener("keydown", handleKeydownEvent);

let skipMidBtns = true;
function handleKeydownEvent(e) {
  switch (e.key) {
    case "ArrowUp":
      if (atTutorial == false) {
        nav(-1);
        console.log("up");
      }
      //$("testValue").text("up");
      break;
    case "ArrowDown":
      if (atTutorial == false) {
        nav(1);
        console.log("down");
      }
      break;
    case "ArrowRight":
      if (atTutorial == false) {
        nav(1);
        console.log("right");
      }
      break;
    case "ArrowLeft":
      if (atTutorial == false) {
        nav(-1);

        console.log("left");
      }
      break;
    case "Enter":
      if (atTutorial == false) {
        nav(0);
      } else {
        navTutorial();
      }
      console.log("pressed OK");
      break;
    default:
      break;
  }
}

function navTutorial() {
  atTutorial = false;
  $("#tutorialPanel").hide("fast");
  $("#b").effect("shake", "slow");
}

let currentIndex = 1;
//seems as if getting an ID from some other object
//does not include the '#' only the name
let selectedElementID = "";
let previousElementID = "";
let previousElementIDColor = 0;
let started = false;
let rightAfterStart = false;
let showInputString = "";
let movesLeftNumber = 3;
let mainAudio = document.getElementById("soundClick");

/*settings vars start*/
let atSettingsMenu = false;
let soundOnNow = true;

/*settings vars end*/
setInterval(function () {
  $("#eyes").animate(
    {
      opacity: "0.1",
    },
    "fast"
  );
}, 4000);

let alreadyPressedOK = false;
function nav(move) {
  var items = document.querySelectorAll(".items");
  //skipping mid btns at gameplay
  if (
    skipMidBtns == true &&
    atSettingsMenu == false &&
    startedGameNowUnique == true
  ) {
    if (move == 1 && currentIndex == 2) {
      currentIndex = 5;
    } else if (move == -1 && currentIndex == 0) {
      currentIndex = items.length;
    } else if (move == -1 && currentIndex == items.length - 2) {
      currentIndex = 3;
    }
  } else if (startedGameNowUnique == false || atSettingsMenu == true) {
    if (move == -1 && currentIndex < 4) {
      currentIndex = items.length;
      console.log("lock at:" + currentIndex);
    } else if (move == 1 && currentIndex == items.length - 1) {
      currentIndex = 2;
    }
  }

  if (move == 0 && alreadyPressedOK == false) {
    if (
      (window.innerWidth < window.innerHeight &&
        selectedElementID !== "g" &&
        selectedElementID !== "c") ||
      (window.innerWidth >= window.innerHeight && selectedElementID !== "d")
    ) {
    }

    //click animation
    if (alreadyPressedOK == false) {
      alreadyPressedOK = true;
      $("#" + selectedElementID).toggleClass("active");
      setTimeout(() => {
        alreadyPressedOK = false;
        $("#" + selectedElementID).toggleClass("active");
      }, 200);
    }

    $("#eyes").animate(
      {
        //width: '2.0rem',
        opacity: "1.0",
      },
      "fast"
    );
  }
  if (selectedElementID == "b" && move == 0 && startedGameNowUnique == false) {
    if (atSettingsMenu == false) {
      startScreen();
    }
  }

  if (move == 0 && started == true) {
    if (soundOnNow == true) {
      mainAudio = document.getElementById("soundClick");
      mainAudio.play();
    }

    if (selectedElementID == "j" && move == 0) {
      if (atSettingsMenu == false) {
        for (let i = 0; i < items.length; i++) {
          if (i < 3) {
            items[i].innerHTML = "";
          }
        }

        //change settings btn icon
        document.getElementById("settings").src = "_assets/backBtnB.png";

        document.getElementById("dImg").src = "_assets/language.png";
        document.getElementById("bImg").src = "_assets/visualsIcon.png";
        if (soundOnNow) {
          document.getElementById("cImg").src = "_assets/soundOn.png";
        } else {
          document.getElementById("cImg").src = "_assets/soundOff.png";
        }
        atSettingsMenu = true;
      } else {
        document.getElementById("settings").src = "_assets/settings.png";

        document.getElementById("dImg").src = "_assets/eyesn.png";
        document.getElementById("bImg").src = "_assets/Empty.png";
        document.getElementById("cImg").src = "_assets/Empty.png";
        atSettingsMenu = false;
        if (startedGameNowUnique == true) {
          resetOn = true;
          levelControl();
        } else {
          startScreen();
        }
      }
    } else if (atSettingsMenu == true) {
      if (selectedElementID == "b" && move == 0) {
        changeVisuals();
        console.log("changed visuals");
      } else if (selectedElementID == "c") {
        soundOnOff();
        if (soundOnNow) {
          document.getElementById("cImg").src = "_assets/soundOn.png";
        } else {
          document.getElementById("cImg").src = "_assets/soundOff.png";
        }
      } else if (selectedElementID == "d") {
        changeLanguage();
      }
    }
    // document.getElementsByClassName(".items").focus();
    else if (
      $("#" + selectedElementID).text() != " " &&
      $("#j").text() != "end" &&
      selectedElementID != "j" &&
      atSettingsMenu == false &&
      startedGameNowUnique == true &&
      selectedElementID != "d" &&
      selectedElementID != "b" &&
      selectedElementID != "c" &&
      movesLeftNumber > 0
    ) {
      // equal sign and (C)lear don't count as moves
      if (
        selectedElementID != "j" &&
        $("#" + selectedElementID).text() != "C" &&
        wonGame == false
      ) {
        //levelControl();

        operationControl($("#" + selectedElementID).text());
        movesLeftNumber = movesLeftNumber - 1;
        movesLeftFeedback();

        // IF PLAYER WON
        if (startingValue == levelObjectiveNumber) {
          if (soundOnNow == true) {
            mainAudio = document.getElementById("winSound");
            mainAudio.play();
          }

          wonGame = true;
          confetti.start(1200, 50, 150);

          levelLeftAt = levelLeftAt + 1;
          $("#objective").text(
            tickMark + allNextTxts[actualLanguageNum] + levelLeftAt
          );

          $("#" + selectedElementID).text(tickMark);

          movesLeftFeedback();

          //$("#show-input").fadeIn('slow');
          //$("#objective").fadeIn('slow');
          //$(".progressionSoFar").fadeIn(500);
        } else if (movesLeftNumber == 0) {
          $("#" + selectedElementID).text("←");
          $("#objective").text(allGameOverTxts[actualLanguageNum]);
          $("#eyes").animate(
            {
              //width: '2.0rem',
              opacity: "0.0",
            },
            "fast"
          );

          //$("#calculator").effect("shake");
          movesLeftFeedback();

          if (soundOnNow) {
            document.getElementById("loseSound").play();
          }
          resetOn = true;
          if (startingValue == levelObjectiveNumber) {
            if (soundOnNow == true) {
              mainAudio = document.getElementById("winSound");
              mainAudio.play();
            }
            $("#objective").text(tickMark);

            levelLeftAt = levelLeftAt + 1;

            levelControl();
            movesLeftFeedback();
          }
        }
      } else if ($("#" + selectedElementID).text() == "C" && wonGame == false) {
        resetOn = false;
        levelControl();
      } else if (wonGame == true) {
        screenTransition();
      }
    } else if (movesLeftNumber == 0) {
      levelControl();
    }
  } else {
    var next = currentIndex + move;

    if (next < 0) {
      next = items.length - 1;
    } else if (next > items.length - 1) {
      next = 0;
    }

    var targetElement = items[next];
    targetElement.focus();

    //getting the element's which is focused on currently id
    selectedElementID = targetElement.id;
    //element being selected is given visual feedback
    if (started == true) {
      $("#" + previousElementID).css(
        "background-color",
        previousElementIDColor
      );
    }
    $("#" + selectedElementID).css("background-color", "#ffaf64");

    started = true;
    // START GAME

    previousElementID = selectedElementID;
    previousElementIDColor = $("#" + previousElementID).css("background-color");

    console.log("selected id:" + selectedElementID);
    if (movesLeftNumber == 0) {
      if (
        selectedElementID != "j" &&
        selectedElementID != "d" &&
        selectedElementID != "b" &&
        selectedElementID != "c"
      ) {
        if (startingValue != levelObjectiveNumber) {
          $("#" + selectedElementID).text("←");
        } else {
          $("#" + selectedElementID).text(tickMark);
        }
      }
    }
    currentIndex = next;
  }
}

let transitionCounter = 0;
let wonGame = false;
let startedGameNowUnique = false;
function screenTransition() {
  if (levelLeftAt == maxLevelsNow) {
    levelLeftAt = 1;
  }

  if (wonGame == true) {
    wonGame = false;
    console.log("won game is now: " + wonGame);
    levelControl();
  }
}

function setRandomColor() {
  $("#calculator").css(
    "background-color",
    "#" + Math.random().toString(16).slice(-6)
  );
  $("#screen-mod").css(
    "background-color",
    "#" + Math.random().toString(16).slice(-6)
  );
  let arr = Math.random().toString(16).slice(-6);
  $("#pusher").css("background-color", "#" + arr);
  $(".progressBar").css("background-color", "#" + arr);
}

var actualVisualNum = 0;
function changeVisuals() {
  switch (actualVisualNum) {
    case 0:
      $("#calculator").css("background-color", "#F7E3D4");
      $("#screen-mod").css("background-color", "#FD7208");
      $("#pusher").css("background-color", "#2369B8");

      actualVisualNum = 0;
      break;
    case 1:
      $("#calculator").css("background-color", "darksalmon");
      $("#screen-mod").css("background-color", "#4eaf64");
      $("#pusher").css("background-color", "#4eaf64");
      actualVisualNum = 1;
      break;
    case 2:
      $("#calculator").css("background-color", "#dddddd");
      $("#screen-mod").css("background-color", "#4eaf64");
      $("#pusher").css("background-color", "#4eaf64");
      actualVisualNum = 2;
      break;
    case 3:
      $("#calculator").css("background-color", "#F7DDD4");
      $("#screen-mod").css("background-color", "rgb(255, 120, 29)");
      $("#pusher").css("background-color", "#448D76");
      actualVisualNum = 3;
      break;
    case 4:
      $("#calculator").css("background-color", "mediumseagreen");
      $("#screen-mod").css("background-color", "#4eaf64");
      $("#pusher").css("background-color", "#4eaf64");
      actualVisualNum = 4;
      break;

    default:
      setRandomColor();
      break;
  }

  if (actualVisualNum >= 8) {
    actualVisualNum = 0;
    console.log(actualVisualNum);
  } else {
    actualVisualNum++;
    console.log(actualVisualNum);
  }

  if (actualVisualNum <= 4) {
    $(".progressBar").css("background-color", "dimgrey");
  }
}

function soundOnOff() {
  if (soundOnNow) {
    soundOnNow = false;
  } else {
    soundOnNow = true;
  }
}

function operationControl(ops) {
  switch (ops[0]) {
    case "x":
      startingValue = startingValue * parseInt(ops[1]);
      break;
    case "÷":
      startingValue = startingValue / parseInt(ops[1]);
      break;
    case "+":
      startingValue = startingValue + parseInt(ops[1]);
      break;
    case "-":
      startingValue = startingValue - parseInt(ops[1]);
      break;

    default:
      break;
  }

  $("#show-input").fadeOut(200);
  setTimeout(() => {
    $("#show-input").fadeIn(100);
    $("#show-input").text(startingValue);
  }, 100);
}

var buildr1 = 0;
var buildr2 = 0;
var buildr3 = 0;
var signs = ["x", "-", "+"];
function randomLevelBuildr() {
  console.log("----------------------------------");
  buildr1 = randomIntFromRange(0, 2);
  buildr2 = randomIntFromRange(0, 2);
  buildr3 = randomIntFromRange(0, 2);

  var xrVal = randomIntFromRange(1, 6);
  var yrVal = randomIntFromRange(1, 6);
  var zrVal = randomIntFromRange(1, 6);
  var startRVal = randomIntFromRange(-10, 10);

  if (xrVal === yrVal) {
    xrVal = randomIntFromRange(1, 5);
  }
  if (xrVal === zrVal) {
    xrVal = randomIntFromRange(1, 5);
  }
  if (yrVal === zrVal) {
    yrVal = randomIntFromRange(1, 5);
  }

  console.log(
    "start factors are: [starting: " +
      startRVal +
      " " +
      "[x: " +
      " " +
      xrVal +
      " " +
      " [y: " +
      " " +
      yrVal +
      " " +
      "[z: " +
      " " +
      zrVal
  );
  console.log("objective is: " + treeControl(xrVal, yrVal, zrVal, startRVal));

  //adhere values
  //treeControl(xrVal,yrVal,zrVal,startRVal);

  startingValue = startRVal;
  saveStart = startingValue;
  $("#e").text(signs[buildr1] + xrVal.toString());
  $("#f").text(signs[buildr2] + yrVal.toString());
  $("#g").text(signs[buildr3] + zrVal.toString());
  buttonFactors[0] = signs[buildr1] + xrVal.toString();
  buttonFactors[1] = signs[buildr2] + yrVal.toString();
  buttonFactors[2] = signs[buildr3] + zrVal.toString();

  levelObjectiveNumber = treeControl(xrVal, yrVal, zrVal, startRVal);
  levelOneBtnDisables();
}

var saveStart = 0;
const movesMod = [3, 4, 5];
var buttonFactors = ["", "", ""];
function clearResetLevel() {
  if (levelLeftAt < 15) {
    movesLeftNumber = movesMod[0];
  } else if (levelLeftAt >= 15 && levelLeftAt < 31) {
    movesLeftNumber = movesMod[1];
  } else if (levelLeftAt >= 30 && levelLeftAt < 35) {
    movesLeftNumber = movesMod[2];
  } else {
    movesLeftNumber = 3;
  }
  $("#e").text(buttonFactors[0]);
  $("#f").text(buttonFactors[1]);
  $("#g").text(buttonFactors[2]);
  startingValue = saveStart;
  resetOn = false;
}

var buildrCountr = 0;
function pickSymbol(firstFactor, secondFactor, buildrID) {
  var sicko = 0;
  if (buildrID == 0) {
    sicko = firstFactor * secondFactor;
  } else if (buildrID == 1) {
    sicko = firstFactor - secondFactor;
    //buildr2 +=  " - " ;
  } else if (buildrID == 2) {
    sicko = firstFactor + secondFactor;
    //buildr3 +=  " + " ;
  } else if (buildrID == 3) {
    sicko = firstFactor / secondFactor;
  }

  return sicko;
}

var resultSave = 0;
function treeControl(a, b, c, startVal) {
  var result = startVal;
  var stepsNum = 3;
  if (levelLeftAt < 15) {
    stepsNum = movesMod[0];
  } else if (levelLeftAt >= 15 && levelLeftAt < 31) {
    stepsNum = movesMod[1];
  } else if (levelLeftAt >= 30 && levelLeftAt < 35) {
    stepsNum = movesMod[2];
  } else {
    stepsNum = 3;
  }
  movesLeftNumber = stepsNum;
  var countr = stepsNum;

  var currentFactorPick = 0;

  for (let i = 0; i < stepsNum; i++) {
    var n = randomIntFromRange(0, 2);

    if (n == 0) {
      currentFactorPick = a;
      result = pickSymbol(result, currentFactorPick, buildr1);
    } else if (n == 1) {
      currentFactorPick = b;
      result = pickSymbol(result, currentFactorPick, buildr2);
    } else if (n == 2) {
      currentFactorPick = c;
      result = pickSymbol(result, currentFactorPick, buildr3);
    }

    countr--;
    //console.log("countr was: " + countr);
    console.log("result num: " + i + " was " + result);
  }
  //this saves the correct result each time, because it calls the global var
  resultSave = result;
  if (startingValue == result) {
    randomLevelBuildr();
  }

  return resultSave;
}
