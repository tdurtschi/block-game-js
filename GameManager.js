var GameManager = function() {
	var playerInfo;
	var ele_newGameDialog;

	this.initGame = function() {
		ele_newGameDialog = null;
		gameArray = new GameBoard(20,20);

		// setup player info (dialog)
		
		// setup UI elements and state
		// refactor to separate them.
	};

	this.endGame = function(){
		// show end-game info
		// trigger the board to un-recreate
	};


	this.restartGame = function() {
		GameControlMediator.endGame();
		GameControlMediator.initGame();
	}

	return {
		initGame: this.initGame,
		endGame: this.endGame,
		restartGame: this.restartGame
	}
}();

// var showPlayerInfoDialog = function() {
// 	var modal = document.getElementById('myModal');
// 	var btn = document.getElementById("myBtn");

// 	// Get the <span> element that closes the modal
// 	var span = document.getElementsByClassName("close")[0];

// 	// When the user clicks on the button, open the modal 
// 	// btn.onclick = function() {
// 	//     modal.style.display = "block";
// 	// }

// 	// When the user clicks on <span> (x), close the modal
// 	span.onclick = function() {
// 	    modal.style.display = "none";
// 	}

// 	// When the user clicks anywhere outside of the modal, close it
// 	window.onclick = function(event) {
// 	    if (event.target == modal) {
// 	        modal.style.display = "none";
// 	    }
// 	}
// }