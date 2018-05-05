let a = "rock";
let b = "paper";
let c = "scissors";
let roundNum = 0;
let pScore = 0;
let cScore = 0;
const roundScore = document.querySelector("#roundScore");
const pChoice = document.querySelector("#pChoice");
const cChoice = document.querySelector("#cChoice");
const result = document.querySelector("#result");
const reset = document.querySelector("#resetBar");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

resetBar.addEventListener("click", function() {
  rock.removeAttribute("disabled");
  paper.removeAttribute("disabled");
  scissors.removeAttribute("disabled");
  roundNum = 0;
  cScore = 0;
  pScore = 0;
  pChoice.textContent = "";
  cChoice.textContent = "";
  roundScore.textContent = "";
  result.textContent = "Lets play a game.";
});

rock.addEventListener("click", function() {
  playGameBrowser("Rock");
});

paper.addEventListener("click", function() {
  playGameBrowser("Paper");
});

scissors.addEventListener("click", function() {
  playGameBrowser("Scissors");
});

//returns random of "rock", "paper" or "scissors"
function computerPlay() {
  let num;
  num = Math.floor(Math.random() * 3 + 1);
  if (num == 1) return "Rock";
  if (num == 2) return "Paper";
  else return "Scissors";
}

//case-insensitive, returns 1(player win), -1(computer win), 0(draw), "error"(wrong input)
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerPlay();
  computerSelection = computerSelection.toLowerCase();
  if (playerSelection === computerSelection) return 0;
  else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  )
    return 1;
  else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  )
    return -1;
  else return "error";
}

//plays 5 round game in console, wrong input does not count in round count
function playGameConsole() {
  let computerChoice;
  let playerChoice;
  let pScore = 0;
  let cScore = 0;
  let result;
  for (i = 0; i < 5; i++) {
    computerChoice = computerPlay();
    playerChoice = prompt("Enter your choice:");
    if (
      playerChoice.toLowerCase() == "rock" ||
      playerChoice.toLowerCase() == "paper" ||
      playerChoice.toLowerCase() == "scissors"
    ) {
      result = playRound(playerChoice, computerChoice);
      if (result === 1) {
        alert("Player WINS with " + playerChoice + " over " + computerChoice);
        pScore++;
      } else if (result === 0)
        alert("It's a draw! " + computerChoice + " over " + playerChoice);
      else if (result === -1) {
        alert("Computer WINS with " + computerChoice + " over " + playerChoice);
        cScore++;
      }
    } else {
      i--;
      alert("Wrong input!");
    }
  }
  alert("PLAYER " + pScore + " COMPUTER " + cScore);
}

function playGameBrowser(player) {
  let i = 0;
  let c = computerPlay();
  i = playRound(player, c);
  if (i == 1) {
    result.textContent = "Player wins with " + player + " over " + c;
    pScore++;
    pChoice.textContent = player;
    cChoice.textContent = c;
  } else if (i == -1) {
    result.textContent = "Player lost with " + player + " over " + c;
    cScore++;
    pChoice.textContent = player;
    cChoice.textContent = c;
  } else {
    result.textContent = "Both chose " + player + ". It's a tie.";
    pChoice.textContent = player;
    cChoice.textContent = c;
  }
  roundNum++;
  if (roundNum == 5) {
    rock.setAttribute("disabled", "true");
    paper.setAttribute("disabled", "true");
    scissors.setAttribute("disabled", "true");
  }
  roundScore.textContent = pScore + " " + cScore;
}
