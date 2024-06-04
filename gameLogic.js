import { Ship, Gameboard, Player } from './battleship.js';
import { render } from './domManager.js';
import { player1, player2 } from "./main.js"; // Adjust the import path as necessary

function switchTurns() {
  // Toggle the playerTurn property for both players
  player1.playerTurn = !player1.playerTurn;
  player2.playerTurn = !player2.playerTurn;

  // Ensure only one player's turn is true at a time
  if (player1.playerTurn) {
    player2.playerTurn = false;
  } else {
    player2.playerTurn = true;
  }

  // Render the gameboards
  render(player1.gameboard, player1.playerTurn);
  render(player2.gameboard, player2.playerTurn);

  // If it's the computer's turn, perform the computer's attack after a short delay
  if (player2.playerTurn && player2.isComputer) {
    setTimeout(() => {
      const { x, y } = getRandomCoordinates();
      player2.attack(player1, x, y);
      render(player1.gameboard, true);
      render(player2.gameboard, false);

      if (player1.gameboard.allShipsSunk()) {
        console.log("Player 2 (Computer) wins!");
        // endGame("Player 2 (Computer) wins!");
      } else {
        switchTurns();
      }
    }, 1000); // Delay for realism
  }
}

function getRandomCoordinates() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return { x, y };
}


export function handleAttack(event) {
  const cell = event.target;
  const x = parseInt(cell.getAttribute('data-x'));
  const y = parseInt(cell.getAttribute('data-y'));

  console.log(`Attacking cell at (${x}, ${y})`);

  if (player1.playerTurn) {
    const result = player1.attack(player2, x, y);
    console.log(`Attack result: ${result}`);
    updateMessage(cell, result);

    // Render both players' Gameboards to display the updated information
    render(player1.gameboard, true);
    render(player2.gameboard, false);

    // Check if the game is over
    if (player2.gameboard.allShipsSunk()) {
      console.log("Player 1 wins!");
      // endGame("Player 1 wins!");
    } else if (player1.gameboard.allShipsSunk()) {
      console.log("Player 2 wins!");
      // endGame("Player 2 wins!");
    } else {
      // Switch turns
      switchTurns();
    }
  }
}



function updateMessage(cell, result) {
  console.log('updateMessage called with result:', result);
  console.log('updateMessage called with cell:', cell);
  if (result === "hit") {
    cell.classList.add('hit'); // Add a CSS class to visually indicate a hit
    console.log('Hit detected');
  } else if (result === "miss") {
    cell = document.querySelector('.cellOpponent')
    cell.classList.add('miss'); // Add a CSS class to visually indicate a miss
    console.log('Miss detected');
  }
}


// Call setupClickListeners to attach event listeners




