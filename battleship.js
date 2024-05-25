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
}
}

class Gameboard {
    constructor(size) {
        this.size = size;
        this.grid = this.createGrid(size);
        this.ships = [];
    }

    createGrid(size) {
        const grid = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(null); // Null represents empty space
            }
            grid.push(row);
        }
        return grid;
    }

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
        // For simplicity, let's assume a hit if there's a ship at the specified location
        if (this.grid[y][x] !== null) {
            // Hit
            const ship = this.grid[y][x];
            ship.hit();
            return 'hit';
        } else {
            // Miss
            return 'miss';
        }
    }
};

module.exports = Ship, Gameboard;
