import { Ship, Gameboard, Player } from './battleship.js';
import { render } from './domManager.js';
import { player1, player2, initializeGameboardWithRandomShips } from "./main.js"; // Adjust the import path as necessary

export function switchTurns() {
  // Toggle the playerTurn property for both players
  player1.playerTurn = !player1.playerTurn;
  player2.playerTurn = !player2.playerTurn;

  // Render the gameboards
  render(player1.gameboard, true);
  render(player2.gameboard, false);


  // If it's the computer's turn, perform the computer's attack after a short delay
  if (player2.playerTurn && player2.isComputer) {
    setTimeout(() => {
      const { x, y } = getRandomCoordinates();
      const result = player2.attack(player1, x, y);
      console.log(`Computer attacked at (${x}, ${y}): ${result}`);
      render(player1.gameboard, true);
      render(player2.gameboard, false);

      if (player1.gameboard.allShipsSunk()) {
        console.log("Player 2 (Computer) wins!");
        endGame("Player 2 (Computer) wins!");
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

    // Render both players' Gameboards to display the updated information
    render(player1.gameboard, true, true);
    render(player2.gameboard, false, false);

    // Check if the game is over
    if (player2.gameboard.allShipsSunk()) {
      console.log("Player 1 wins!");
      endGame("Player 1");
    } else if (player1.gameboard.allShipsSunk()) {
      console.log("Player 2 wins!");
      endGame("Player 2");
    } else {
      console.log('Switching turns');
      switchTurns();
    }
  }
}

function endGame(winner) {
  // Disable further clicks on the opponent's board
  const cells = document.querySelectorAll('.cellOpponent');
  cells.forEach(cell => {
      cell.removeEventListener('click', handleAttack);
  });

  // Display the winner message
  const messageContainer = document.getElementById('message-container');
  if (!messageContainer) {
      const newMessageContainer = document.createElement('div');
      newMessageContainer.id = 'message-container';
      newMessageContainer.innerHTML = `
          <h2>${winner}</h2>
          <button id="restart-button">Restart Game</button>
      `;
      document.body.appendChild(newMessageContainer);
  } else {
      messageContainer.innerHTML = `
          <h2>${winner}</h2>
          <button id="restart-button">Restart Game</button>
      `;
  }

  document.getElementById('restart-button').addEventListener('click', restartGame());
}

function restartGame() {
  player1.gameboard = new Gameboard();
  player2.gameboard = new Gameboard();

    initializeGameboardWithRandomShips(player1.gameboard);
    initializeGameboardWithRandomShips(player2.gameboard);

    player1.playerTurn = true;
    player2.playerTurn = false;

    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        messageContainer.remove();
    }

    render(player1.gameboard, true, true);
    render(player2.gameboard, false, false);

    setupClickListeners();
  };