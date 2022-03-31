/* 
view: keeps the display updated (hits, misses, messages)
model: keeps track of the abstract data (where the ships are, their status)
controller: binds everything together (receives user input and implements game logic)
*/

//view:
const view = {
  displayMessage: function (msg) {
    const messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

//model:
/*   (if we did ships individually)
const ship1 = {
  locations: ["00", "07", "21"],
  hits: ["", "", ""],
};

const ship2 = {
  locations: ["37", "38", "39"],
  hits: ["", "", ""],
};

const ship3 = {
  locations: ["42", "43", "44"],
  hits: ["", "", ""],
};
*/

const model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,

  ships: [
    { locations: ["00", "07", "21"], hits: ["", "", ""] },
    { locations: ["37", "38", "39"], hits: ["", "", ""] },
    { locations: ["42", "43", "44"], hits: ["", "", ""] },
  ],

  fire: function (guess) {
    for (i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let locations = ship.locations; // using same variables = chaining - so we don't have to create a ton of new variables
      let index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sunk my battleship!");
          this.shipsSunk++;
        }
      }
      return true;
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },

  isSunk: function (ship) {
    for (i = 0; i < this.shipLength; i++) {
      if (ships[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
};
/*test:
var shipper = ships[1];
var spot = ship2.locations;
console.log("Location is " + spot[1]);

model.fire("00");
model.fire("48");
*/

//controller:

const controller = {
    guesses: 0,

    proccessGuess: function(guess) {
        
    }
};
