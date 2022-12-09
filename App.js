const app = document.getElementById('app');
const grid = new Grid('default');
app.innerHTML = grid.html;
grid.init();

function moveUp2() {
    grid.moveStorm('up',2)
    app.innerHTML = grid.html;
    grid.init();
}

function moveLeft2() {
    grid.moveStorm('left',2)
    app.innerHTML = grid.html;
    grid.init();
}