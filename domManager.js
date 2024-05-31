import { Gameboard } from "./battleship.js";
import { playerAttack } from "./main.js";



export function render(gameboard, containerId) {
    gameboard = new Gameboard();
    
    const container = document.getElementById('player-board');
    const containerOpponent = document.getElementById('computer-board')

    container.innerHTML = '';
    containerOpponent.innerHTML = '';

    // Loop through each cell in the gameboard
    for (let y = 0; y < gameboard.grid.length; y++) {
        for (let x = 0; x < gameboard.grid[y].length; x++) {
            const cell = document.createElement('div');
            const cellOpponent = document.createElement('div');
            cell.classList.add('cell');
            cellOpponent.classList.add('cellOpponent');
            container.appendChild(cell);
            containerOpponent.appendChild(cellOpponent);

        }
    }
    containerOpponent.addEventListener('click', playerAttack);
}



