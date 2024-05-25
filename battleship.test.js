const { Ship, Gameboard } = require('./battleship.js');

/*
describe('Ship', () => {
    let myShip;

    beforeEach(() => {
        myShip = new Ship(4); // Create a new ship before each test
    });

    test('hit() method should increase hits count by 1', () => {
        myShip.hit();
        expect(myShip.hits).toBe(1);
    })

    test('isSunk() method should calculate whether a ship is considered sunk based on its length and the number of hits it has received', () => {
        myShip.isSunk();
        expect(myShip.sunk).toBe(false);
    })
});
*/

describe('Gameboard', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        gameboard = new Gameboard(10);
        ship = new Ship(3);
    });

    test('creates a grid of the specified size', () => {
        expect(gameboard.grid.length).toBe(10);
        expect(gameboard.grid.every(row => row.length === 10)).toBe(true);
    });

    test('places a ship horizontally', () => {
        gameboard.placeShip(ship, 2, 3, 'horizontal');
        expect(gameboard.grid[3][2]).toBe(ship);
        expect(gameboard.grid[3][3]).toBe(ship);
        expect(gameboard.grid[3][4]).toBe(ship);
        expect(gameboard.ships.length).toBe(1);
    });

    test('places a ship vertically', () => {
        gameboard.placeShip(ship, 2, 3, 'vertical');
        expect(gameboard.grid[3][2]).toBe(ship);
        expect(gameboard.grid[4][2]).toBe(ship);
        expect(gameboard.grid[5][2]).toBe(ship);
        expect(gameboard.ships.length).toBe(1);
    });

    test('throws error when ship does not fit horizontally', () => {
        expect(() => gameboard.placeShip(ship, 8, 3, 'horizontal')).toThrow('Ship does not fit horizontally on the board.');
    })

    test('throws error when ship does not fit vertically', () => {
        expect(() => gameboard.placeShip(ship, 2, 8, 'vertical')).toThrow('Ship does not fit vertically on the board.');
    });

    test('receives a hit', () => {
        gameboard.placeShip(ship, 2, 3, 'horizontal');
        expect(gameboard.receiveAttack(2, 3)).toBe('hit');
        expect(ship.hits).toBe(1);
    });

    test('receives a miss', () => {
        expect(gameboard.receiveAttack(0, 0)).toBe('miss');
    });

    test('receives a hit and sinks the ship', () => {
        gameboard.placeShip(ship, 2, 3, 'horizontal');
        gameboard.receiveAttack(2, 3);
        gameboard.receiveAttack(3, 3);
        gameboard.receiveAttack(4, 3);
        expect(ship.isSunk()).toBe(true);
    });
});