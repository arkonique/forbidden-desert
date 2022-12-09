const app = document.getElementById("board");
const grid = new Grid("default");
app.innerHTML = grid.html;
grid.init();

let stormCards = createStormDeck();
let stormDeck = new Deck(stormCards, []);
stormDeck.shuffle();

let gearCards = createGearDeck("y");
let gearDeck = new Deck(gearCards, []);
gearDeck.shuffle();

function moveUp2() {
    moveGrid("up", 2, app, grid);
}

function moveLeft2() {
    moveGrid("left", 2, app, grid);
}
