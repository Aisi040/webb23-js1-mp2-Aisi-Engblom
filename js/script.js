const choices = document.querySelectorAll('.choice');
const playerScoreSpan = document.querySelector('#player-score');
const computerScoreSpan = document.querySelector('#computer-score');
const playerChoice = document.querySelector('#player-choice');
const computerChoice = document.querySelector('#computer-choice');
const result = document.querySelector('#result');
const restartButton = document.querySelector('#restart');

let playerScore = 0;
let computerScore = 0;
let finishedScore = 3;

// gör namnet personligt
function updatePlayerName(event) {
    if (event.key === 'Enter') {
      var name = document.getElementById('player-name').value;
      var playerHeading = document.getElementById('player-heading');
      playerHeading.textContent = name;
    }
  }
  
  //Göm knappen innan.
  restartButton.style.display = 'none';

// Funktionen gör så att datorn väljer
function getComputerChoice() {
  const random = Math.random();
  if (random < 0.33) {
    return 'Sten';
  } else if (random < 0.66) {
    return 'Påse';
  } else {
    return 'Sax';
  }
}

// Funktionen är för att visa player's choice
function displayPlayerChoice(choice) {
  playerChoice.innerHTML = `Du valde <strong>${choice}</strong>`;
}

// Funktion för att visa computer's choice 
function displayComputerChoice(choice) {
  computerChoice.innerHTML = `Datorn valde <strong>${choice}</strong>`;
}

// Visa score
function updateScore() {
  playerScoreSpan.innerHTML = playerScore;
  computerScoreSpan.innerHTML = computerScore;
}

// Visa resultat
function displayResult(resultText) {
  result.innerHTML = resultText;
}

// End game
function endGame() {
  // Disable all choices
  choices.forEach(choice => choice.disabled = true);

  // Restart knapp
  restartButton.style.display = 'block';
}

function restartGame() {
  // all choices
  choices.forEach(choice => choice.disabled = false);

  // göm restart button
  restartButton.style.display = 'none';

  // Reset scores
  playerScore = 0;
  computerScore = 0;
  updateScore();

  // Reset choices 
  playerChoice.innerHTML = '';
  computerChoice.innerHTML = '';
  result.innerHTML = '';
}

// Event listener for player's choice
choices.forEach(choice => {
  choice.addEventListener('click', function() {
    const playerChoiceValue = choice.id;
    const computerChoiceValue = getComputerChoice();

    displayPlayerChoice(playerChoiceValue);
    displayComputerChoice(computerChoiceValue);

    if (playerChoiceValue === computerChoiceValue) {
      displayResult('Oavgjort!');
    } else if (playerChoiceValue === 'Sten' && computerChoiceValue === 'Sax' ||
               playerChoiceValue === 'Påse' && computerChoiceValue === 'Sten' ||
               playerChoiceValue === 'Sax' && computerChoiceValue === 'Påse') {
      displayResult('Du vann!');
      playerScore++;
      updateScore();
      if (playerScore === finishedScore) {
        displayResult(`Grattis, du vann spelet!`);
        endGame();
      }
    } else {
      displayResult('Datorn vann!');
      computerScore++;
      updateScore();
      if (computerScore === finishedScore) {
        displayResult(`Datorn vann spelet! Försök igen.`);
        endGame();
      }
    }
  });
});

// Event listener for restart button
restartButton.addEventListener('click', restartGame);
