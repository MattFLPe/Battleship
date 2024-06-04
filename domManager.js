import { Gameboard, Ship } from "./battleship.js";
import { handleAttack } from "./gameLogic.js"

export function render(gameboard = new Gameboard(), isPlayerBoard, isPlayerTurn,) {
    
    if (!gameboard) {
        console.error("Gameboard is undefined");
        return;
    }
    const container = isPlayerBoard ? document.getElementById('player-board') : document.getElementById('computer-board');
    container.innerHTML = '';


    // Loop through each cell in the gameboard
    for (let y = 0; y < gameboard.grid.length; y++) {
        for (let x = 0; x < gameboard.grid[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add(isPlayerBoard ? 'cell' : 'cellOpponent');
            cell.setAttribute('data-x', x);
            cell.setAttribute('data-y', y);

            // Add classes for hits and misses for both player and opponent boards
            if (gameboard.grid[y][x] === 'hit') {
                cell.classList.add('hit');
            } else if (gameboard.grid[y][x] === 'miss') {
                cell.classList.add('miss');
            } else if (isPlayerBoard && gameboard.grid[y][x] instanceof Ship) {
                cell.classList.add('ship'); 
            };

            container.appendChild(cell);
            
            if (!isPlayerBoard) {
                cell.addEventListener('click', handleAttack);
            };
        };

        if (!isPlayerTurn && !isPlayerBoard) {
            const enemyCells = document.querySelectorAll('.cellOpponent');
            enemyCells.forEach(cell => {
                if (!cell.hasAttribute('listener-attached')) {
                    cell.addEventListener('click', handleAttack);
                    cell.setAttribute('listener-attached', 'true');
                };
            });
            /*
        if (!isPlayerTurn) {
            const enemyCells = document.querySelectorAll('.cellOpponent');
            enemyCells.forEach(cell => {
              cell.addEventListener('click', handleAttack);
            });
          }
          */    
    };
}
};


