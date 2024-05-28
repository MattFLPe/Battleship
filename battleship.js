class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
            console.log("Ship has been sunk!");
    } 
    return this.hits === this.length;
}
}

class Gameboard {
    constructor(size) {
        this.size = size;
        this.grid = this.createGrid(size);
        this.ships = [];
        this.missedAttacks = this.createGrid(size)
    }

    allShipsSunk() {
        for(const shipPlacement of this.ships) {
            if (!shipPlacement.ship.isSunk()) {
                return false; // If any ship is not sunk, return false
            }
        }
        return true; // All ships are sunk 
    }

    createGrid(size) {
        const grid = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(null); // Null represents empty space
            };
            grid.push(row);
        };
        return grid;
    };

    placeShip(ship, x, y, orientation) {
        // Check if ship fits on the board
        if (orientation === 'horizontal' && x + ship.length > this.size) {
            throw new Error('Ship does not fit horizontally on the board.');
        }
        if (orientation === 'vertical' && y + ship.length > this.size) {
            throw new Error('Ship does not fit vertically on the board.');
        }

        for (let i = 0; i < ship.length; i++) {
            const cellX = orientation === 'horizontal' ? x + i : x;
            const cellY = orientation === 'vertical' ? y + i : y;
            this.grid[cellY][cellX] = ship;
        }

      // Add the ship to the list of ships on the board
      this.ships.push({
        ship: ship,
        x: x,
        y: y,
        orientation: orientation
    });
}

    receiveAttack(x, y) {
        // Process the attack
        // assuming a hit if there's a ship at the specified location
        if (this.grid[y][x] !== null) {
            // Hit
            const ship = this.grid[y][x];
            ship.hit();
            return 'hit';
        } else {
            // Mark the missed attack on the missedAttacks grid
            this.missedAttacks[y][x] = 'miss';
            // Miss
            return 'miss';
        }
    }
};

class Player {
    constructor(player, computer) {
        this.player = player;
        this.computer = computer;
    }
}

const gameboard = new Gameboard(10); // Create a gameboard with size 10x10
const ship = new Ship(3); // Create a ship with length 3 (you need to define the Ship class)
gameboard.placeShip(ship, 2, 3, 'horizontal'); // Place the ship at coordinates (2, 3) horizontally
gameboard.receiveAttack(2, 3); // Attack the coordinates (2, 3)

module.exports = { Ship, Gameboard };