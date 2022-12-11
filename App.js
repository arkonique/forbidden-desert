const app = document.getElementById("board");
const grid = new Grid("default");
app.innerHTML = grid.html;
grid.init();

let stormCards = createStormDeck();
let stormDeck = new Deck(stormCards, [],"storm");
stormDeck.shuffle();

let gearCards = createGearDeck("y");
let gearDeck = new Deck(gearCards, [],"gear");
gearDeck.shuffle();

let sdecks = document.getElementById("storm__decks");
let gdecks = document.getElementById("gear__decks");
sdecks.innerHTML = stormDeck.deckHtml;
gdecks.innerHTML = gearDeck.deckHtml;

stormMeter(3,"elite");