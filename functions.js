function randomPosition(n, excludedPositions = []) {
  let randomPositions = [];
  let x, y;
  for (let i = 0; i < n; i++) {
    x = Math.floor(Math.random() * 5);
    y = Math.floor(Math.random() * 5);
    // check if position is already in the array
    if (
      randomPositions.some((position) => position.x === x && position.y === y)
    ) {
      i--;
      continue;
    }
    // check if position is in the excludedPositions array
    if (
      excludedPositions.some((position) => position.x === x && position.y === y)
    ) {
      i--;
      continue;
    }
    // check if position is 2,2
    if (x === 2 && y === 2) {
      i--;
      continue;
    }
    randomPositions.push({ x: x, y: y });
  }
  return randomPositions;
}

function createStormDeck() {
  let dirs = ["u", "d", "l", "r"];
  let number = [1, 2, 3];
  let occurences = [3, 2, 1];

  let deck = dirs
    .map((d) => {
      return number.map((x, i) => {
        return Array(occurences[i]).fill(d + x);
      });
    })
    .concat([Array(4).fill("sbd"), Array(3).fill("spu")])
    .flat()
    .flat();

  return deck;
}

function createGearDeck(yn) {
  let gear = ["ss", "tt", "sw", "jp", "ts", "db"];
  let occurences = [2, 1, 1, 3, 2, 3];
  let deck = gear
    .map((g, i) => {
      return Array(occurences[i]).fill(g);
    })
    .flat();

  if (yn === "y") {
    deck.push("st");
  }

  return deck;
}

function stormCard(string) {
  let card = {};
  if (string === "sbd") {
    card = {
      type: "sun",
      title: "Sun Beats Down",
      description:
        "Players each lose 1 water unless they're in a tunnel or under a Solar Shield.",
    };
  }
  if (string === "spu") {
    card = {
      type: "sand",
      title: "Storm Picks Up",
      description:
        "Move the stom meter up one mark. Start drawing this amount of cards from the storm deck from the next turn.",
    };
  }
  if (string[0] === "u") {
    card = {
      type: "storm",
      direction: "up",
      amount: parseInt(string[1]),
    };
  }
  if (string[0] === "d") {
    card = {
      type: "storm",
      direction: "down",
      amount: parseInt(string[1]),
    };
  }
  if (string[0] === "l") {
    card = {
      type: "storm",
      direction: "left",
      amount: parseInt(string[1]),
    };
  }
  if (string[0] === "r") {
    card = {
      type: "storm",
      direction: "right",
      amount: parseInt(string[1]),
    };
  }
}

function gearCard(string) {
  let card = {};
  if (string === "ss") {
    card = {
      type: "gear",
      title: "Solar Shield",
      description:
        "You and other players on your tile may ignore the effects of the Sun Beats Down card until the start of your next turn.",
      turn: "any",
    };
  }
  if (string === "tt") {
    card = {
      type: "gear",
      title: "Time Throttle",
      description: "Take 2 more actions during a turn",
      turn: "your",
    };
  }
  if (string === "sw") {
    card = {
      type: "gear",
      title: "Secret water reserve",
      description: "All players on your tile receive 2 water.",
      turn: "any",
    };
  }
  if (string === "jp") {
    card = {
      type: "gear",
      title: "Jet Pack",
      description:
        "Move to any unblocked tile. Another player on your starting tile may come along for the ride.",
      turn: "any",
    };
  }
  if (string === "ts") {
    card = {
      type: "gear",
      title: "Terrascope",
      description: "Peek under any unexcavated tile.",
      turn: "any",
    };
  }
  if (string === "db") {
    card = {
      type: "gear",
      title: "Dune Blaster",
      description: "Remove all sand from your tile or any adjacent tile.",
      turn: "any",
    };
  }
  if (string === "st") {
    card = {
      type: "gear",
      title: "Storm Tracker",
      description:
        "Look at the top cards of the storm deck equal to the storm level, and place one of them at the bottom of the deck.",
      turn: "any",
    };
  }
}

function updateSandMeter(grid) {
  let sandFill = document.querySelector(".sand__meter__bar__fill");
  let sandText = document.querySelector(".sand__title");
  let currentSand = grid.totalSand();
  console.log(currentSand);
  sandFill.style.width = `${((48 - currentSand) * 100) / 48}%`;
  sandText.innerHTML = `Sands left: (${48 - currentSand}/48)`;
}

function moveGrid(dir,num,app,grid) {
  grid.moveStorm(dir, num);
  app.innerHTML = grid.html;
  grid.init();
  updateSandMeter(grid);
}