const app = document.getElementById('app');
const grid = new Grid('default');
app.innerHTML = grid.html;
grid.init();