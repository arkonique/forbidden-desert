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

console.log(stormDeck);
let decks = document.getElementById("decks");
decks.innerHTML += stormDeck.deckHtml;
decks.innerHTML += gearDeck.deckHtml;
