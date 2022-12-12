const app = document.getElementById("board");
const grid = new Grid("default");
app.innerHTML = grid.html;
grid.init();

let stormCards = createStormDeck();
var stormDeck = new Deck(stormCards, [], "storm");
stormDeck.shuffle();

let gearCards = createGearDeck("y");
var gearDeck = new Deck(gearCards, [], "gear");
gearDeck.shuffle();

let sdecks = document.getElementById("storm__decks");
sdecks.innerHTML =
  "<div class='draw_storm' onclick='drawStormCard(stormDeck)'>DRAW</div>";
sdecks.innerHTML += stormDeck.deckHtml;
sdecks.innerHTML += stormDeck.discardedHtml;

let gdecks = document.getElementById("gear__decks");
gdecks.innerHTML = "<div class='draw_gear' onclick='drawGearCard(gearDeck)'>DRAW</div>";
gdecks.innerHTML += gearDeck.deckHtml;
gdecks.innerHTML += gearDeck.discardedHtml;

stormMeter(3, "elite");
