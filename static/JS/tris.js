let links = document.querySelectorAll(".gridBtn"),
			currentPlayer = 1,
    cellIsOccupied = true


		for(let i = 0; i < links.length; i++){
			let link = links[i]
			link.addEventListener("click", function(e){
				e.preventDefault()
	
        cellIsOccupied = e.currentTarget.classList.contains("player2") || e.currentTarget.classList.contains("player1")	;			
        
        console.log(cellIsOccupied)
				if(!cellIsOccupied){
				
        e.currentTarget.classList.toggle("player1")
        }
			})
		}