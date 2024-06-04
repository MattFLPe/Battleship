export { Ship, Gameboard, Player };
import { render } from "./domManager.js";
//import { startGame } from "./gameLogic.js";

let playerTurn = true;

class Ship {
    constructor(length) {
      this.length = length;
      this.hits = 0;
    };
  
    hit() {
        this.hits += 1;
    };
  
    isSunk() {
        return this.hits >= this.length;    }
  };

class Gameboard {
    constructor() {
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = []; 
        this.recordedAttacks = [];
    };

    createGrid(rows, cols) {
        const grid = [];
        for (let i = 0; i < rows; i++) {
          grid.push(new Array(cols).fill(null));
        };
        return grid;
      };

      placeShipRandomly(ship) {
        const directions = ['horizontal', 'vertical'];
        let placed = false;

        while (!placed) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const maxX = direction === 'horizontal' ? 10 - ship.length : 10;
            const maxY = direction === 'vertical' ? 10 - ship.length : 10;
            const startX = Math.floor(Math.random() * maxX);
            const startY = Math.floor(Math.random() * maxY);

            if (this.canPlaceShip(ship, startX, startY, direction)) {
                this.placeShip(ship, startX, startY, direction);
                placed = true;
            };
        };
    };

    canPlaceShip(ship, startX, startY, direction) {
      if (direction === 'horizontal') {
          for (let i = 0; i < ship.length; i++) {
              if (this.grid[startY][startX + i] !== null) {
                  return false;
              }
          }
      } else if (direction === 'vertical') {
          for (let i = 0; i < ship.length; i++) {
              if (this.grid[startY + i][startX] !== null) {
                  return false;
              }
          }
      }
      return true;
  };

    
      placeShip(ship, startX, startY, direction) {
        if (direction === 'horizontal') {
          for (let i = 0; i < ship.length; i++) {
            if (this.grid[startY][startX + i] !== null) {
              throw new Error("Cannot place ship here, spot is already occupied");
          };
            this.grid[startY][startX + i] = ship;
          };
        } else if (direction === 'vertical') {
          for (let i = 0; i < ship.length; i++) {
            if (this.grid[startY + i][startX] !== null) {
              throw new Error("Cannot place ship here, spot is already occupied");
          };
            this.grid[startY + i][startX] = ship;
          };
        };
        this.ships.push(ship);
        console.log('Ship placed:', this.grid);
        };

      receiveAttack(x, y) {
        if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[0].length) {
          console.error(`Invalid coordinates (${x}, ${y})`);
          return 'invalid';
      };

        const cell = this.grid[y][x];
        console.log(`Receiving attack at (${x}, ${y}):`, cell);
        if (cell === null) {
            this.grid[y][x] = 'miss';
            this.recordedAttacks.push({ x, y, result: 'miss' });
            return 'miss'
        } else if (cell instanceof Ship) {
            cell.hit();
            this.grid[y][x] = 'hit';
            this.recordedAttacks.push({ x, y, result: 'hit' });
            return 'hit'
        };
       
    };

    
    allShipsSunk() {
        return this.ships.every(ship => ship.hits === ship.length);  
    };
};



class Player {
    constructor(isComputer = false) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard();
    }
    attack(opponent, x, y) {
        if (this.isComputer) {
          return this.computerAttack(opponent);
        } else {
          return this.playerAttack(opponent, x, y);
        }
      }
    
      playerAttack(opponent, x, y) {
        const result = opponent.gameboard.receiveAttack(x, y);
        return result; // Ensure the result is returned
      }
    
      computerAttack(opponent) {
        let x, y;
        do {
          x = getRandomNumber();
          y = getRandomNumber();
        } while (opponent.gameboard.recordedAttacks.some(attack => attack.x === x && attack.y === y));
    
        const result = opponent.gameboard.receiveAttack(x, y);
        return result; // Ensure the result is returned
      }
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 10); 
      }
      

const gameboard = new Gameboard();
const player1 = new Player(false);
const player2 = new Player(true);
/*
const ship1 = new Ship(3);
player1.gameboard.placeShip(ship1, 0, 0, 'horizontal'); // A ship of length 3 at (0,0) horizontally
const ship2 = new Ship(3);
player2.gameboard.placeShip(ship2, 2, 2, 'horizontal'); // A ship of length 3 at (2,2) horizontally

console.log('Initial Gameboard:', player1.gameboard.grid);
console.log('Initial Gameboard:', player2.gameboard.grid);

player1.attack(player2, 2, 2); // This should hit the ship placed at (2,2)
console.log('Post-Attack Gameboard:', player2.gameboard.grid);
*/
