var PieceCollection = function(playerId) {
	this.playerId = playerId;
	this.pieces = [];
	for(var pid = 0; pid < GamePieces.length; pid++)
			{
				var $piece = new Piece(playerId, pid);

				this.pieces[pid] = $piece;		
			}

	this.hidePieces = function(){
		this.pieces.forEach(function(piece) {piece.hide();})
	};

	this.showPieces = function() {
		this.pieces.forEach(function(piece) {piece.show();})
	};

	this.hidePieces();
}

var Piece = function(playerId, pid) {
	var pieceDisplayClassName = "p" + playerId + "Cell";
	var pieceId = pid;
	var $piece;
	CreatePiece(pid);

	function CreatePiece(pid) {
		$piece = getNewGamePiece();

		

		$piece.data("pid", pid);

		// $("<div></div>", {class:"gamePieceContainer"})
		// 	.append($piece)
		// 	.appendTo($("#pieceCollection"));
		$piece.appendTo($("#pieceCollection"));
	}

	function hide() {
		$piece.addClass("hidden");
	}

	function show() {
		$piece.removeClass("hidden");
	}

	function getNewGamePiece(){
		if(!GamePiecesRotateSymmetry[pieceId])
		{
			var $rotateButton = $("<a></a>",{class:"rotateButton"})
				.click(function(){
					rotatePiece();
					adjustFlipButton($piece.children(".flipButton"));
				})
				.hide();
		}

		if(!GamePiecesFlipSymmetry[pieceId])
		{
			var $flipButton = $("<a></a>",{class:"flipButton"})
			.click(function(){
				flipPiece();
			})
			.hide();
			adjustFlipButton($flipButton);
		}

		var $piece = $("<div></div>", {class:"gamePiece"})
			.hover(
				//hover handler:
				function(){
					if(!$(this).data("disable_buttons"))
					{
						$(this).children(".rotateButton").show();
						$(this).children(".flipButton").show();
					}
				},
				//un-hover handler:
				function(){
					$(this).children(".rotateButton").hide();
					$(this).children(".flipButton").hide();
				})
			.draggable({
				start:function(){
					$(this).data("disable_buttons",true);
					$(this).children(".rotateButton").hide();
					$(this).children(".flipButton").hide();
				},
				stop:function(){
					$(this).removeData("disable_buttons");
				},
				opacity:0.5,
				containment:'#gameContainer',
				stack:'.gamePiece',
				revert: true})
			.append($("<table cellspacing=\"0\"></table>"))
			.append($rotateButton)
			.append($flipButton);
		render($piece.children('table'), pid);
		return $piece;
	};

	function adjustFlipButton(flipButton){
		var thisPiece = GamePieces[pid];
		var left = thisPiece[0].length * (SizeX/2) - 8;
		var top = thisPiece.length * (SizeY/2) - 8;

		flipButton.css({
			"left": left + "px",
			"top": top + "px"
		});
	}

	function render($table, pid){
		var thisPiece = GamePieces[pid];
		var stateArray = [];
		var maxWidth = 0;
		
		$table.children().remove();

		for(var i = 0; i < thisPiece.length; i++)
		{
			maxWidth = thisPiece[i].length > maxWidth ? thisPiece[i].length : maxWidth;
		}

		for(var i = 0; i < thisPiece.length; i++)
		{
			var $tr = $("<tr></tr>");
			stateArray[i] = [];
			for(var j = 0; j < maxWidth; j++)
			{
				if(thisPiece[i][j] == 1)
				{
					$tr.append($("<td></td>",{class:"cell " + pieceDisplayClassName}));
					stateArray[i][j] = 1;
				}
				else
				{
					$tr.append($("<td></td>",{class:"cell whiteCell"}));
					stateArray[i][j] = 0;
				}
			}
			$tr.appendTo($table);
		}

		$table.data("state",stateArray);
	}

	function flipPiece(){
		var $rotated = $("<table cellspacing=\"0\"></table>");
		var pid = pieceId;
		var oldPiece = GamePieces[pid];
		var newPiece = [];
		for(var i = 0; i < oldPiece.length; i++)
			{
				newPiece[i] = [];
				for(var j = 0; j < oldPiece[0].length; j++)
				{
					newPiece[i][j] = oldPiece[i][oldPiece[0].length - 1 - j];
				}
			}
		GamePieces[pid] = newPiece;
		render($piece.children("table"), pid);
	}

	function rotatePiece(){
		var $rotated = $("<table cellspacing=\"0\"></table>");
		var pid = $piece.data("pid");
		var oldPiece = GamePieces[pid];
		var newPiece = [];
		for(var i = 0; i < oldPiece[0].length; i++)
			{
				newPiece[i] = [];
				for(var j = 0; j < oldPiece.length; j++)
				{
					newPiece[i][j] = oldPiece[j][oldPiece[0].length - 1 - i];
				}
			}
		GamePieces[pid] = newPiece;
		render($piece.children("table"), pid);
	}

	return {
		jq: $piece,
		hide: hide,
		show: show
	}
}