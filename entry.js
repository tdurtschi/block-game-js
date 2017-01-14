var GameArray = {};

function EntryPoint() {
	this.init = function (){
			//Should not be global.
			GameArray = generateGameBoard(20, 20);
			PlayerId = 4;
			PlayerClassName = "p" + PlayerId + "Cell"
			$("#gameGrid")
				.droppable( {
					      accept: '.gamePiece',
					      hoverClass: 'hovered',
					      drop: handlePieceDrop});
			gameX = $("#gameGrid").offset().left;
			gameY = $("#gameGrid").offset().top;
			
			generateGamePieces();
		};
}