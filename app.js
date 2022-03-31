/* 
view: keeps the display updated (hits, misses, messages)
model: keeps track of the abstract data (where the ships are, their status)
controller: binds everything together (receives user input and implements game logic)
*/

//view: 
 const view = {
     displayMessage: function(msg) {
        const messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
     },
     displayHit: function(location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
     },
     displayMiss: function(location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
     }
 };

 //model:
 const ship1 = {
     locations: ["00", "07", "21"],
     hits: ["", "", ""]
 };

 const ship2 = {
    locations: ["37", "38", "39"],
    hits: ["", "", ""]
};

const ship3 = {
    locations: ["42", "43", "44"],
    hits: ["", "", ""]
};