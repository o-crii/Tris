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

	ChangeTurn.play()


}







