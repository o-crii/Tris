const cella = document.querySelectorAll(".cella")
const PLAYER_X = "X"
const PLAYER_O = "O"
let turn = PLAYER_X

const BoardState = Array(cella.lenght)  /* la costante BoardState sarà composta da un array con 9 elementi all'interno*/
BoardState.fill(null)

//elementi

const strike = document.getElementById("strike")
const GameOverBox = document.getElementById("GameOverBox")
const GameOverText = document.getElementById("GameOverText")
const PlayBtn = document.getElementById("PlayBtn")


const GameOverSound = new Audio("../sound/GameOverSound.mp3")
const clickSound = new Audio ("../sound/ChangeTurn.mp3")

//anteprima turno

function SetHoverText(){
	//rimuoviamo tutto il testo al passaggio del mouse creando un loop sulle celle
	cella.forEach((cella) => {
		cella.classList.remove("x-hover")
		cella.classList.remove("o-hover")
	})

	const hoverClass = `${turn.toLowerCase()}-hover`

	//impostiamo l'anteprima solo se al passaggio del mouse non è occupata la cella
	cella.forEach((cella) => {
		if (cella.innerText == "") { //se il testo della cella è vuoto farà
			cella.classList.add(hoverClass) //aggiungiamo la classo hover definita nel rigo 29
		}
	})

}


SetHoverText()



//visualizzazione cella prima di giocare

cella.forEach((cella) => cella.addEventListener("click", CellaClick))

function CellaClick(event){
	if (GameOverBox.classList.contains("visible")) {
		return
	}

	const cella = event.target
	const CellaNum = cella.dataset.index
	if (cella.innerText != "") {
		return
	}

	//controllo per vedere chi sta giocando
	if (turn === PLAYER_X) {
		cella.innerText = PLAYER_X
		BoardState[CellaNum-1] = PLAYER_X
		turn = PLAYER_O
	}

	//abbiamo gestito il turno di x quindi mo faccio O

	else{
		cella.innerText = PLAYER_O
		BoardState[CellaNum-1] = PLAYER_O
		turn = PLAYER_X
	}

	//gestito lo switch dei turni

	SetHoverText() //per l'anteprima quando si cambia turno

	CheckWinner()

	//ChangeTurn.play()


}


function CheckWinner(){
	for(const winningCombination of winningCombinations){
		//estraggo la combinazione vincente
		const {combo, strikeClass} = winningCombination
		const cellaValue1 = BoardState[combo[0] - 1]
		const cellaValue2 = BoardState[combo[1] - 1]
		const cellaValue3 = BoardState[combo[2] - 1]

		if (cellaValue1 != null && cellaValue1 === cellaValue2 && cellaValue1 === cellaValue3) { //se il valore della cella 1 non è nullo ed è uguale al valore della cella 2 e 3 si vince
			strike.classList.add(strikeClass)
		}

	}
}


const winningCombinations = [ 
	{combo:[1,2,3], strikeClass: "strike-row-1"} //prima riga

	{combo:[4,5,6], strikeClass: "strike-row-2"} //seconda riga

	{combo:[7,8,9], strikeClass: "strike-row-3"} //terza riga



	{combo:[1,4,7], strikeClass: "strike-col-1"} //prima colonna

	{combo:[2,5,8], strikeClass: "strike-col-2"} //seconda colonna

	{combo:[3,6,9], strikeClass: "strike-col-3"} //terza colonna


	{combo:[1,5,9], strikeClass: "strike-diag-1"} //prima diagonale 
	{combo:[3,5,7], strikeClass: "strike-diag-2"} //seconda diagonale 
]







