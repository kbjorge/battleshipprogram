/* 
view: keeps the display updated (hits, misses, messages)
model: keeps track of the abstract data (where the ships are, their status)
controller: binds everything together (receives user input and implements game logic)
*/

//view:
var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
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

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,

  ships: [
    { locations: ["00", "01", "02"], hits: ["", "", ""] },
    { locations: ["37", "38", "39"], hits: ["", "", ""] },
    { locations: ["28", "35", "42"], hits: ["", "", ""] },
  ],

  

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;

  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
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

var controller = {
  guesses: 0,

  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipSunk === model.numShips) {
            view.displayMessage("You sunk my battleship in " + this.guesses + " guesses!");
        }
    }
  } 
}

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}
// event-handlers:

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);

    guessInput.value = "";

}

window.onload = init;

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
}

