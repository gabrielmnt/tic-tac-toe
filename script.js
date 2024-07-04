const cells = document.querySelectorAll('.cell'); // Select all cells
const resetButton = document.getElementById('resetButton'); // Select the reset button
const gameStatus = document.getElementById('gameStatus'); // Select the game status header
let currentPlayer = 'X'; // Current player starts as 'X'
let board = ['', '', '', '', '', '', '', '', '']; // Initial board state
let gameActive = true; // Game state is active

// Define winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click event
const handleCellClick = (event) => {
    const cell = event.target; // Get clicked cell
    const index = cell.getAttribute('data-index'); // Get cell index

    // Ignore clicks if the cell is already filled or the game is inactive
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // Update board state and cell content
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    // Check for win or draw
    if (checkWin()) {
        gameStatus.textContent = `"${currentPlayer}" wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        gameStatus.textContent = `"${currentPlayer}" turn`;
    }
};

// Check for win
const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

// Reset the game
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Reset board state
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
        cell.classList.remove('X', 'O'); // Remove classes
    });
    currentPlayer = 'X'; // Reset current player
    gameActive = true; // Activate game state
    gameStatus.textContent = 'Tic Tac Toe'; // Reset game status text
};

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
