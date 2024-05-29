const { Ship, Gameboard } = require('./battleship.js');
const domManager = require('./domManager.js');


class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(10);
    }

    attack(x, y) {
        if (!this.isComputer) {
            // Player's turn
            this.playerAttack(x, y);
        } else {
            // Computer's turn
            this.computerAttack();
        }
    }

    playerAttack(x, y) {
        const result = this.gameboard.receiveAttack(x, y);
        domManager.renderGameboard(this);
        domManager.renderGameboard(this.opponent);
        if (this.opponent.gameboard.allShipsSunk()) {
            endGame("Player Wins!");
        } else {
            this.switchTurns(); 
        }
    }


    computerAttack() {
        let x, y;
        do {
            x = getRandomNumber();
            y = getRandomNumber();
        } while (this.opponent.gameboard.isCoordinateAttacked(x, y)); // Ensure the computer doesn't attack the same coordinate twice
        const result = this.opponent.gameboard.receiveAttack(x, y);
        domManager.renderGameboard(this);
        domManager.renderGameboard(this.opponent);
        if (this.opponent.gameboard.allShipsSunk()) {
            endGame("Computer Wins!");
        } else {
            this.switchTurns(); 
        }
    }


switchTurns() {
    playerTurn = !playerTurn;
    if (playerTurn && !this.isComputer) {
        // If it's now the player's turn and this player is not the computer, enable the event listener
        enablePlayerAttackListener();
    } else {
        // Otherwise, disable the event listener
        disablePlayerAttackListener()
    }
}
};



const player = new Player(false); // Real player
const computer = new Player(true);  // Computer player

module.exports = { Player }