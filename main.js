import { Ship, Gameboard, Player } from './battleship.js';
//import { startGame } from './gameLogic.js';
import { render } from './domManager.js'
import { handleAttack } from './gameLogic.js';
export { player1, player2 }

export function initializeGameboardWithRandomShips(gameboard) {
    const shipLengths = [5, 4, 3, 3, 2]; 
    shipLengths.forEach(length => {
        const ship = new Ship(length);
        gameboard.placeShipRandomly(ship);
    });
}

const player1 = new Player(false);
const player2 = new Player(true);

// Ensure only one player has the turn initially
player1.playerTurn = true;
player2.playerTurn = false;

// Set opponents
player1.opponent = player2;
player2.opponent = player1;

const player1Gameboard = new Gameboard();
const player2Gameboard = new Gameboard();

initializeGameboardWithRandomShips(player1.gameboard);
initializeGameboardWithRandomShips(player2.gameboard);

render(player1.gameboard, true); // Render player1's board
render(player2.gameboard, false); // Render player2's board



