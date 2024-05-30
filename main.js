import { Ship, Gameboard, Player } from './battleship.js';
import { startNewGame, handlePlayerAttack } from './gameLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    startNewGame();
});

document.querySelectorAll('.opponent-cell').forEach(cell => {
    cell.addEventListener('click', event => {
        const player = new Player(false); // Human player
        const computer = new Player(true); // Computer player
        handlePlayerAttack(event, player, computer);
    });
});