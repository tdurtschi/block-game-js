function Player(playerId) {
	this.playerId = playerId;
	this.isFirstMove = true;
	this.className = getClassName(playerId); 	//Used to set block style

	var getClassName = function(playerId){
		return "p" + playerId + "Cell";
	}
}