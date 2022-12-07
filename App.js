const app = document.getElementById('app');

// Create a new tile
const tile = new Tile('t1','blank', 'gear', [], 0, 0, { x: 0, y: 2 });
// add tile to the DOM
console.log(tile.html);
app.innerHTML = tile.html;
tile.init();