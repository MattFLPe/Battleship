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

module.exports = Ship;
