// Description: Tile class for the game board

class Tile {
  front = "blank"; // Blank, Water, Crash
  back = "gear"; // Gear, Water, Tunnel, Piece, Launchpad
  players = []; // Array of player objects
  sand = 0; // Number of sand tokens on the tile
  state = 0; // Unexcavated = 0, Excavated = 1
  position = { x: 0, y: 0 }; // Position in the grid as matrix coordinate
  html; // HTML element
  id; // Unique ID

  constructor(id, front, back, players, sand, state, position,gearno) {
    const frontImg = {
      blank: "tile_front.png",
      water: "tile_front_water.png",
      crash: "tile_front_crash.png",
      storm: "tile_front_storm.png",
    };

    const backImg = {
        gear: `tile_back_gear_${gearno}.png`,
        water: "tile_back_water.png",
        tunnel: "tile_back_tunnel.png",
        compassX: "tile_back_compassX.png",
        compassY: "tile_back_compassY.png",
        fanX: "tile_back_fanX.png",
        fanY: "tile_back_fanY.png",
        engineX: "tile_back_engineX.png",
        engineY: "tile_back_engineY.png",
        obeliskX: "tile_back_obeliskX.png",
        obeliskY: "tile_back_obeliskY.png",
        mirage: "tile_back_mirage.png",
        launchpad: "tile_back_launchpad.png",
        storm: "tile_front_storm.png"
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
                data-is-storm=${front==="storm"?"true":"false"}
            >
            <div class="tile__inner">
            <div class="tile__face tile__face--front">
                <img
                src="${frontImg[front]}"
                />
            </div>
            <div class="tile__face tile__face--back">
                <img
                src="${backImg[back]}"
                />
            </div>
            </div>
            <div class="players">
            <div class="player player--1">
                <img src="meeple-svgrepo-com.svg" />
            </div>
            <div class="player player--2">
                <img src="meeple-svgrepo-com.svg" />
            </div>
            <div class="player player--3">
                <img src="meeple-svgrepo-com.svg" />
            </div>
            <div class="player player--4">
                <img src="meeple-svgrepo-com.svg" />
            </div>
            <div class="player player--5">
                <img src="meeple-svgrepo-com.svg" />
            </div>
            <div class="player player--6">
                <img src="meeple-svgrepo-com.svg" />
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

  reduceSand() {
    if (this.sand === -1) {
      return;
    }
    this.sand--;
    document
      .getElementById(this.id)
      .querySelector(".sand__count span").innerHTML = this.sand;
    // if sand goes to 0, make sand count invisible
    if (this.sand <= 0) {
      document
        .getElementById(this.id)
        .querySelector(".sand__count span").innerHTML = "";
    }
    if(this.sand<0) return;
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
    if (this.sand === -1) {
      return true;
    }
    return false;
  }
}
