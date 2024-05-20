const Ship = require('./battleship.js');

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