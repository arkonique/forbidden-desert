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
  sandFill.style.width = `${((48 - currentSand) * 100) / 48}%`;
  sandText.innerHTML = `SANDS LEFT: (${48 - currentSand}/48)`;
}

function moveGrid(dir, num, app, grid) {
  grid.moveStorm(dir, num);
  app.innerHTML = grid.html;
  grid.init();
}

function stormMeter(num, difficulty) {
  const difficultyObj = {
    novice: 0,
    normal: 1,
    elite: 2,
    legendary: 3,
  };
  const playerNum = {
    p2: [2, 3, 3, 3],
    p3: [2, 3, 3, 3, 3],
    p4: [2, 3, 3, 3, 3],
    p5: [2, 3, 3, 3, 3, 3],
  };

  const all = [4, 4, 4, 4, 5, 5, 5, 6, 6];

  const meterArray = [
    ...playerNum[`p${num}`].slice(difficultyObj[difficulty]),
    ...all,
  ];

  const meterHtml = `
  <div class="storm__meter__bar">
    <div class="notick m${meterArray[0]}"></div>
    ${meterArray
      .map((x, i) => {
        if (meterArray[i] === meterArray[i + 1]) {
          return `<div class="tick m${meterArray[i]}">${meterArray[i]}</div>`;
        } else {
          return `<div class="tick m${meterArray[i]}-5">${meterArray[i+1]}</div>`;
        }
      })
      .join("")}
    <div class="arrow">
      <img src="arrow_clip.png" alt="arrow" />
    </div>
  </div>
  `;
  document.getElementById("storm__meter").innerHTML = meterHtml;
  document
    .querySelector(".storm__meter__bar")
    .style.setProperty("--ticks", meterArray.length + 1);

  document.querySelector(
    ".m6-5"
  ).innerHTML = `<i class="fas fa-skull-crossbones"></i>`;
  return meterArray;
}

function moveStormMeter(action="move") {
  const pos = parseInt(
    getComputedStyle(document.querySelector(".arrow")).getPropertyValue(
      "--position"
    )
  )

  const ticks = parseInt(
    getComputedStyle(document.querySelector(".storm__meter__bar")).getPropertyValue(
      "--ticks"
    )
  )
  if (pos >= ticks - 1) return "dead";
  if (action === "move"){
    document.querySelector(".arrow").style.setProperty("--position", pos + 1);
  }
  
  current = document.querySelector(".storm__meter__bar div:nth-child(" + (pos+1) + ")").innerHTML;
  console.log(current)
  return current;
}
