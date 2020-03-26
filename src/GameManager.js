var ele_newGameDialog;
var gameArray;

var initGame = function () {
	ele_newGameDialog = null;
	gameArray = new GameBoard(20, 20);
};

var endGame = function () {
};


var restartGame = function () {
	GameControlMediator.endGame();
	GameControlMediator.initGame();
}

export const GameManager = {
	initGame: initGame,
	endGame: endGame,
	restartGame: restartGame
}
