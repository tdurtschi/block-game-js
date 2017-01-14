function GameBoard(x, y) {
	var board = [];
	var state = [];
	var $board = $("#gameGrid");

	init();

	function init(){
		for(var i = 0; i < y; i++)
		{
			var gameRow = [];
			state[i] = [];
			var $tr = $("<tr></tr>");
			for(var j = 0; j < x; j++)
			{
				gameRow.push(
					$("<td></td>", {class:"cell greyCell"})
					.data("x", j)
					.data("y", i)
					.appendTo($tr));
				state[i][j] = 0;
			}
			$tr.appendTo($board);
			board.push(gameRow);
		}
			
		setupDroppable();
	}
	

	function setupDroppable() {
		function handlePieceDrop(event, ui){
			var $gamePiece = ui.draggable;
		    var offsetY = ui.offset.top;
		    var offsetX = ui.offset.left;

		    function getCoordinates(x, y, $piece){
				var dx = x - gameX;
				var dy = y - gameY;
				var pid = $piece.data("pid");


				var xCoord = Math.floor(( dx + (SizeX / 2) ) / SizeX);
				var yCoord = Math.floor(( dy + (SizeY / 2) ) / SizeY);

				return {"x": xCoord, "y": yCoord};
			}
		    var coords = getCoordinates(offsetX, offsetY, $gamePiece);

		    var validationResult = validateMove(GameArray, $gamePiece, coords.x, coords.y, PlayerStates[CurrentPlayerId]);
		    if(validationResult == true)
	    	{
		    	//$gamePiece.draggable( 'disable' );
		    	//Do Move
	   		    applyPiece(coords.x, coords.y, $gamePiece, PlayerStates[CurrentPlayerId]);
	   		    //TODO put this into Player class
				PlayerStates[CurrentPlayerId].isFirstMove = false;
	   		    
	   		    handleAfterMove();
	   		}
			else
			{
				//TODO
			}
		}


		function validateMove(gameArray, $piece, x, y, playerState){
			var isValid = true;
			var pieceState = $piece.children("table").data("state");
			var gameState = gameArray.state;
			var pieceY = pieceState.length;
			var pieceX = pieceState[0].length;

			//Condition 1: piece fits completely on game board
			if(x < 0 || y < 0 ||
				gameState.length < y + pieceY ||
				gameState[0].length < x + pieceX)
			{
				isValid = false;
			}

			//Condition 2: doesn't overlap other blocks
			if(isValid)
			{
				for(var i = 0; i < pieceY; i++)
				{
					if(isValid)
					{
						for(var j = 0; j < pieceX; j++)
						{
							if(pieceState[i][j] !== 0 && gameState[y + i][x + j] !== 0)
							{
								isValid = false;
								break;
							}
						}
					}
				}
			}

			//Condition 3: doesn't have same colored blocks adjacent
			if(isValid)
			{
				for(var i = 0; i < pieceY; i++)
				{
					if(isValid)
					{
						for(var j = 0; j < pieceX; j++)
						{
							if(pieceState[i][j] == 1)
							{
								//check above
								if( y + i > 0 &&
									gameState[y + i - 1][x + j] == playerState.playerId)
								{
									isValid = false;
									break;
								}

								//check right
								if( x + j + 1 < gameState[0].length &&
									gameState[y + i][x + j + 1] == playerState.playerId)
								{
									isValid = false;
									break;
								}

								//check below
								if( y + i + 1 < gameState.length &&
									gameState[y + i + 1][x + j] == playerState.playerId)
								{
									isValid = false;
									break;
								}

								//check left
								if( x + j > 0 &&
									gameState[y + i][x + j - 1] == playerState.playerId)
								{
									isValid = false;
									break;
								}
							}
						}
					}
				}
			}

			//Condition 4: must touch same colored block diagonally at least once, or,
			//if first move, make sure it touches a corner piece.
			if(isValid)
			{
				if(playerState.isFirstMove)
				{
					if(!((pieceState[0][0] == 1 && x == 0 && y == 0) ||
						(pieceState[pieceY - 1][pieceX - 1] == 1 && 
							x + pieceX == gameState[0].length &&
							y + pieceY == gameState.length) ||
						(pieceState[0][pieceX - 1] == 1 &&
							x + pieceX == gameState[0].length &&
							y == 0) ||
						(pieceState[pieceY - 1][0] == 1 &&
							y + pieceY == gameState.length &&
							x == 0)))
					{
						isValid = false;
					}
				}
				else
				{
					var foundMatch = false;
					for(var i = 0; i < pieceY; i++)
					{
						if(isValid || !foundMatch)
						{
							for(var j = 0; j < pieceX; j++)
							{
								if(pieceState[i][j] == 1 &&
									(( y + i + 1 < gameState.length &&
									  x + j + 1 < gameState[0].length &&
										gameState[y + i + 1][x + j + 1] == playerState.playerId ) ||
										( y + i + 1 < gameState.length &&
											x + j > 0 &&
											gameState[y + i + 1][x + j - 1] == playerState.playerId ) ||
										( y + i > 0 &&
											x + j + 1 < gameState[0].length &&
											gameState[y + i - 1][x + j + 1] == playerState.playerId ) ||
										( y + i > 0 &&
											x + j > 0 &&
											gameState[y + i - 1][x + j - 1] == playerState.playerId )))
								{
									foundMatch = true;
									break;
								}
							}
						}
					}

					if(!foundMatch)
					{
						isValid = false;
					}
				}
			}

			return isValid;
		}


		$("#gameGrid")
				.droppable( {
					      accept: '.gamePiece',
					      hoverClass: 'hovered',
					      drop: handlePieceDrop});
	}

	return {"html":board, "state":state};
}