class Tile {
  front = "blank"; // Blank, Water, Crash
  back = "gear"; // Gear, Water, Tunnel, Piece, Launchpad
  players = []; // Array of player objects
  sand = 0; // Number of sand tokens on the tile
  state = 0; // Unexcavated = 0, Excavated = 1
  position = { x: 0, y: 0 }; // Position in the grid as matrix coordinate
  html; // HTML element
  id; // Unique ID

  constructor(id, front, back, players, sand, state, position) {
    const frontImg = {
      blank: "tile_front.png",
      water: "tile_front_water.png",
      crash: "tile_front_crash.png",
    };

    this.id = id;
    this.front = front;
    this.back = back;
    this.players = players; //players will have an id and a color
    this.sand = sand;
    this.state = state;
    this.position.x = position.x;
    this.position.y = position.y;
    this.html = `
            <div 
                id="${id}"    
                class="tile" 
                data-position-x=${position.x} 
                data-position-y=${position.y}
            >
            <div class="tile__inner">
            <div class="tile__face tile__face--front">
                <img
                src="${frontImg[front]}"
                />
            </div>
            <div class="tile__face tile__face--back">
                <img
                src="https://i.picsum.photos/id/638/800/800.jpg?hmac=gzm6YwClaSh2J8N3d90Wz0LFzgkaqNTlbcipp1Py8bU"
                />
            </div>
            </div>
            <div class="sands">
            <div class="sand__count">
                <span>${sand}</span>
            </div>
            ${`<div class="sand">
            <div class="sand__token"></div>
        </div>`.repeat(sand)}
            </div>
        </div>
        `;
  }

  // if new tile is created, run some code
  init() {
    // if sand is 0, make sand count invisible
    if (this.sand === 0) {
      document
        .getElementById(this.id)
        .querySelector(".sand__count span").innerHTML = "";
    }
    // rotate each sand token by a random amount between -10 and 10 degrees in multiples of 3
    document
        .getElementById(this.id)
        .querySelectorAll(".sand__token").forEach((sand) => {
            sand.style.transform = `rotate(${Math.floor(Math.random() * 7) * 3 - 10}deg)`;
        });

    // add event listener to tile
    document.getElementById(this.id).addEventListener("click", () => {
      this.reduceSand();
      if (this.canExcavate()) {
        this.excavate();
      }
    });
  }

  reduceSand() {
    if (this.sand === 0) {
      return;
    }
    this.sand--;
    document
      .getElementById(this.id)
      .querySelector(".sand__count span").innerHTML = this.sand;
    // if sand goes to 0, make sand count invisible
    if (this.sand === 0) {
      document
        .getElementById(this.id)
        .querySelector(".sand__count span").innerHTML = "";
    }
    document.querySelector(`#${this.id} .sand`).remove();
  }

  excavate() {
    this.state = 1;
    document.getElementById(this.id).classList.add("excavated");
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p.id !== player.id);
  }

  addSand() {
    this.sand++;
    document
      .getElementById(this.id)
      .querySelector(".sand__count span").innerHTML = this.sand;
    document.getElementById(this.id).querySelector(".sands").innerHTML += `
        <div class="sand">
            <div class="sand__token"></div>
        </div>
        `;
  }

  moveTile(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  canExcavate() {
    if (this.state === 1) {
      return false;
    }
    if (this.sand === 0) {
      return true;
    }
    return false;
  }
}
