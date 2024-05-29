const { Ship, Gameboard } = require('./battleship.js');
const domManager = require('./domManager.js');

class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(10);
    }
}

const playerAttack = (x, y) => {
    // Perform attack on computer's game board
    const result = computer.gameboard.receiveAttack(x, y);
    
    // Render game boards
    domManager.renderGameboard(player);
    domManager.renderGameboard(computer);

    // Check if game is over
    if (computer.gameboard.allShipsSunk()) {
        // End game
        endGame("Player Wins!");
    } else {
        // Trigger computer's turn
        setTimeout(computerAttack, 1000); // Delay for 1 second for better UX
    }
};

const player = new Player(false); // Real player
const computer = new Player(true);  // Computer player

module.exports = { Player }