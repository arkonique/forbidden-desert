function randomPosition(n, excludedPositions = []) {
    let randomPositions = [];
    let x, y;
    for (let i = 0; i < n; i++) {
        x = Math.floor(Math.random() * 5);
        y = Math.floor(Math.random() * 5);
        // check if position is already in the array
        if (randomPositions.some((position) => position.x === x && position.y === y)) {
            i--;
            continue;
        }
        // check if position is in the excludedPositions array
        if (excludedPositions.some((position) => position.x === x && position.y === y)) {
            i--;
            continue;
        }
        // check if position is 2,2
        if (x === 2 && y === 2) {
            i--;
            continue;
        }
        randomPositions.push({ x:x, y:y });
    }
    return randomPositions;
}