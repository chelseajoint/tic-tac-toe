let currentPlayer = 1;
let gameInProgress = true;

function getTiles() {
    return document.getElementsByClassName('tile');
}
const tiles = getTiles();

const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
const playerElements = document.getElementsByClassName('player');

statusElement.textContent = 'Game in progress...';
restartButton.style.display = 'none';
restartButton.style.display = 'none';

function checkWin() {
    const winPositions = [
        [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], // Горизонтальные линии
        [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [4, 8, 12, 16], // Вертикальные линии
        [1, 2, 5, 6], [2, 3, 6, 7], [3, 4, 7, 8], [5, 6, 9, 10], [6, 7, 10, 11], [7, 8, 11, 12], [9, 10, 13, 14], [10, 11, 14, 15], [11, 12, 15, 16] // Квадраты 2x2
    ];

    for (const position of winPositions) {
        const [a, b, c, d] = position;
        const tilesValues = [tiles[a - 1].innerHTML, tiles[b - 1].innerHTML, tiles[c - 1].innerHTML, tiles[d - 1].innerHTML];
        
        if (tilesValues.every(value => value === 'X') || tilesValues.every(value => value === 'O')) {
            return true;
        }
    }
    
    if ([...tiles].every(tile => tile.innerHTML !== '')) {
        return 'draw';
    }

    return false;
}

function updateGameStatus() {
    const winResult = checkWin();

    if (winResult) {
        gameInProgress = false;
        statusElement.textContent = winResult === 'draw' ? 'Draw!' : `Player ${currentPlayer} won!`;
        restartButton.style.display = 'inline-block';
        for (const player of playerElements) {
            player.classList.remove('active');
        }
    } else {
        statusElement.textContent = 'Game in progress...';
    }
}

function tileClickHandler(event) {
    const tile = event.target;

    if (gameInProgress && tile.innerHTML === '') {
        tile.innerHTML = currentPlayer === 1 ? 'X' : 'O';
        updateGameStatus();
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        for (const player of playerElements) {
            player.classList.toggle('active');
        }
    }
}

for (const tile of tiles) {
    tile.addEventListener('click', tileClickHandler);
}
restartButton.addEventListener('click', () => {
    for (const tile of tiles) {
        tile.innerHTML = '';
    }
    gameInProgress = true;
    currentPlayer = 1;
    statusElement.textContent = 'Game in progress...';
    restartButton.style.display = 'none';
    playerElements[0].classList.add('active');
});

playerElements[0].classList.add('active');
