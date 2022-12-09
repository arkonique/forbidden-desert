// Description: Grid class for the game board containing all the tiles

class Grid {
  // tile initialization matrices
  tiles = [...Array(5)].map((e) => Array(5).fill(0));
  fronts = [...Array(5)].map((e) => Array(5).fill("blank"));
  backs = [...Array(5)].map((e) => Array(5).fill("gear"));
  players = [...Array(5)].map((e) => Array(5).fill([]));
  sands = [...Array(5)].map((e) => Array(5).fill(0));
  states = [...Array(5)].map((e) => Array(5).fill(0));
  html;
  constructor(
    tiles = [...Array(5)].map((e) => Array(5).fill(0)),
    fronts = [...Array(5)].map((e) => Array(5).fill("blank")),
    backs = [...Array(5)].map((e) => Array(5).fill("gear")),
    players = [...Array(5)].map((e) => Array(5).fill([])),
    sands = [...Array(5)].map((e) => Array(5).fill(0)),
    states = [...Array(5)].map((e) => Array(5).fill(0))
  ) {
    // Default values
    if (tiles === "default") {
      [
        this.sands[0][2],
        this.sands[1][1],
        this.sands[1][3],
        this.sands[2][0],
        this.sands[2][4],
        this.sands[3][1],
        this.sands[3][3],
        this.sands[4][2],
      ] = [1, 1, 1, 1, 1, 1, 1, 1];

      // generate four random grid positions
      let randomPositions = randomPosition(4);

      this.fronts[2][2] = "storm";
      this.backs[2][2] = "storm";

      // set first three random positions to be water
      this.fronts[randomPositions[0].x][randomPositions[0].y] = "water";
      this.backs[randomPositions[0].x][randomPositions[0].y] = "water";
      this.fronts[randomPositions[1].x][randomPositions[1].y] = "water";
      this.backs[randomPositions[1].x][randomPositions[1].y] = "water";
      this.fronts[randomPositions[2].x][randomPositions[2].y] = "water";
      this.backs[randomPositions[2].x][randomPositions[2].y] = "mirage";
      // set last random position to be crash
      this.fronts[randomPositions[3].x][randomPositions[3].y] = "crash";

      // generate 12 random grid positions excluding the randomPositions
      let randomPositions2 = randomPosition(12, randomPositions);

      // set the first 8 random positions to be pieces
      this.backs[randomPositions2[0].x][randomPositions2[0].y] = "obeliskX";
      this.backs[randomPositions2[1].x][randomPositions2[1].y] = "obeliskY";
      this.backs[randomPositions2[2].x][randomPositions2[2].y] = "engineX";
      this.backs[randomPositions2[3].x][randomPositions2[3].y] = "engineY";
      this.backs[randomPositions2[4].x][randomPositions2[4].y] = "compassX";
      this.backs[randomPositions2[5].x][randomPositions2[5].y] = "compassY";
      this.backs[randomPositions2[6].x][randomPositions2[6].y] = "fanX";
      this.backs[randomPositions2[7].x][randomPositions2[7].y] = "fanY";

      // set 3 random positions to be tunnels
      this.backs[randomPositions2[8].x][randomPositions2[8].y] = "tunnel";
      this.backs[randomPositions2[9].x][randomPositions2[9].y] = "tunnel";
      this.backs[randomPositions2[10].x][randomPositions2[10].y] = "tunnel";

      // set last random position to be lauchpad
      this.backs[randomPositions2[11].x][randomPositions2[11].y] = "launchpad";

      // put players on crash
      this.players[randomPositions[3].x][randomPositions[3].y] = [
        0, 1, 2, 3, 4, 5,
      ];

      // html string
      this.html = `<div class="grid">`;

      // initialize tiles
      let gearNo = 0;
      let notGearNo = -1;
      let passNo = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.backs[i][j] === "gear") {
            gearNo++;
            passNo = gearNo;
          } else {
            passNo = notGearNo;
          }
          this.tiles[i][j] = new Tile(
            `t${i}${j}`,
            this.fronts[i][j],
            this.backs[i][j],
            this.players[i][j],
            this.sands[i][j],
            this.states[i][j],
            { x: i, y: j },
            passNo
          );
          this.html += this.tiles[i][j].html;
        }
      }
      this.html += `</div>`;
      return;
    }
    this.tiles = tiles;
    this.fronts = fronts;
    this.backs = backs;
    this.players = players;
    this.sands = sands;
    this.states = states;
  }

  // Initialize the grid
  init() {
    console.table(this.fronts);
    console.table(this.backs);
    console.table(this.players);
    console.table(this.sands);
    console.table(this.states);
    console.table(this.tiles);

    // add event listeners
    this.tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        console.log(tile);
        // initialize tile
        if (tile.sand === 0) {
          document
            .getElementById(tile.id)
            .querySelector(".sand__count span").innerHTML = "";
        }

        let sandTokens = document
          .getElementById(tile.id)
          .querySelectorAll(".sand__token");
        sandTokens.forEach((sandToken) => {
          sandToken.style.transform = `rotate(${
            Math.floor(Math.random() * 7) * 3 - 10
          }deg)`;
        });

        document.getElementById(tile.id).addEventListener(
          "click",
          () => {
            tile.reduceSand();
            if (tile.canExcavate()) {
              tile.excavate();
            }
            this.states[i][j] = tile.state;
          },
          true
        );
      });
    });
    // excavate storm
    this.tiles[2][2].excavate();
  }

  // Move grid
  moveStorm(direction, number) {
    // 1. Find the storm tile
    // 1.1. Find tile that has storm
    let stormTile = this.tiles
      .find((row) => {
        return row.find((tile) => {
          return tile.front === "storm";
        });
      })
      .find((tile) => {
        return tile.front == "storm";
      });
    // 1.2. Find the row of the storm tile in the grid
    let stormTileRow = stormTile.position.x;
    // 1.3. Find the column of the storm tile in the row
    let stormTileColumn = stormTile.position.y;
    // 2. Find all other affected tiles (Note: actual storm motion is opposite of direction)
    let affectedTiles;
    if (direction === "up") {
      // 2.1. If storm is moving up, tiles below it are affected
      affectedTiles = this.tiles
        .slice(stormTileRow + 1, stormTileRow + number + 1)
        .map((row) => {
          return row[stormTileColumn];
        });
    } else if (direction === "down") {
      // 2.2. If storm is moving down, tiles above it are affected
      affectedTiles = this.tiles
        .slice(stormTileRow - number, stormTileRow)
        .map((row) => {
          return row[stormTileColumn];
        });
    } else if (direction === "left") {
      // 2.3. If storm is moving left, tiles to the right of it are affected
      affectedTiles = this.tiles.map((row) => {
        return row.slice(stormTileColumn + 1, stormTileColumn + number + 1);
      })[stormTileRow];
    } else if (direction === "right") {
      // 2.4. If storm is moving right, tiles to the left of it are affected
      affectedTiles = this.tiles.map((row) => {
        return row.slice(stormTileColumn - number, stormTileColumn);
      })[stormTileRow];
    }
    // 2.5. make an array of all the tiles that are affected
    let allAffectedTiles = [stormTile, ...affectedTiles];
    let rotatedAllAffectedTiles = [
      ...allAffectedTiles.slice(1),
      allAffectedTiles[0],
    ];
    // 2.6. Add sand to the affected tiles except the storm tile
    affectedTiles.forEach((tile) => {
      tile.sand++;
    });
    // 3. Move the tiles
    // 3.2. Update the grid
    // 3.2.1. Get affected tile positions
    let affectedTilePositions = allAffectedTiles.map((tile) => {
      return tile.position;
    });
    // 3.2.2. Change elements in the tiles array based on affected tile positions
    affectedTilePositions.forEach((position, i) => {
      this.tiles[position.x][position.y] = rotatedAllAffectedTiles[i];
    });
    // 3.2.3. Change the position of the tiles
    this.tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        tile.moveTile(i, j);
      });
    });
    // 3.2.4. Change the front and back arrays
    this.fronts = this.tiles.map((row) => {
      return row.map((tile) => {
        return tile.front;
      });
    });
    this.backs = this.tiles.map((row) => {
      return row.map((tile) => {
        return tile.back;
      });
    });
    // 3.2.5. Change the player array
    this.players = this.tiles.map((row) => {
      return row.map((tile) => {
        return tile.players;
      });
    });
    // 3.2.6. Change the sand array
    this.sands = this.tiles.map((row) => {
      return row.map((tile) => {
        return tile.sand;
      });
    });
    // 3.2.7. Change the state array
    this.states = this.tiles.map((row) => {
      return row.map((tile) => {
        return tile.state;
      });
    });
    // 4. Update the html
    this.html = `<div class="grid">`;
    let oldTiles = this.tiles;
    let gearNo = 0;
    let notGearNo = -1;
    let passNo = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.backs[i][j] === "gear") {
          gearNo++;
          passNo = gearNo;
        } else {
          passNo = notGearNo;
        }
        this.tiles[i][j] = new Tile(
          oldTiles[i][j].id,
          this.fronts[i][j],
          this.backs[i][j],
          this.players[i][j],
          this.sands[i][j],
          this.states[i][j],
          { x: i, y: j },
          passNo
        );
        this.html += this.tiles[i][j].html;
      }
    }
    this.html += `</div>`;
  }
}
