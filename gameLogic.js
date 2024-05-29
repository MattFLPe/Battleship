const { Ship, Gameboard } = require('./battleship.js');

class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(10);
    }
}

module.exports = { Player }