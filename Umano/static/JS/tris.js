const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);


const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//Suoni da chiedere a Mastrandrea
const gameOverSound = new Audio("/static/sound/GameOverSound.mp3");
const clickSound = new Audio("/static/sound/ChangeTurn.mp3");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  //aggiusta l'anteprima della mossa da poterla fare solo in celle libere e non occupate
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  clickSound.play();
  setHoverText();
  checkWinner();
}

function checkWinner() {
  //controllo per il vincitore
  for (const winningCombination of winningCombinations) {
    
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

//se tileValue1 è diverso da null ma è uguale al valore di tileValue2 e tileValue3 applicheraà la classe strike
    if (
      tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  //verifica del pareggio
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

//se winnertext è diverso da null ci sarà un vincitore, altrimenti un pareggio
function gameOverScreen(winnerText) {
  let text = "PAREGGIO!";
  if (winnerText != null) {
    text = `VINCE ${winnerText}!`;
  }
  //impostiamo visibili la gameOver area con il suo contenuto e il testo
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

//nascondiamo l'area del gameOver e impostiamo i valori nelle celle nulli e il turno di x
function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
}

//combinazioni per decretare il vincitore o il pareggio
const winningCombinations = [
  //combinazioni righe
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },

  //combinazioni colonne
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },

  //combinazioni diagonali
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
