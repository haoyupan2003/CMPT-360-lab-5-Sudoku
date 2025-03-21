// Predefined Sudoku puzzles and solutions
const puzzles = [
    {
        puzzle: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        solution: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]
    },
    {
        puzzle: [
            [0, 0, 0, 2, 6, 0, 7, 0, 1],
            [6, 8, 0, 0, 7, 0, 0, 9, 0],
            [1, 9, 0, 0, 0, 4, 5, 0, 0],
            [8, 2, 0, 1, 0, 0, 0, 4, 0],
            [0, 0, 4, 6, 0, 2, 9, 0, 0],
            [0, 5, 0, 0, 0, 3, 0, 2, 8],
            [0, 0, 9, 3, 0, 0, 0, 7, 4],
            [0, 4, 0, 0, 5, 0, 0, 3, 6],
            [7, 0, 3, 0, 1, 8, 0, 0, 0]
        ],
        solution: [
            [4, 3, 5, 2, 6, 9, 7, 8, 1],
            [6, 8, 2, 5, 7, 1, 4, 9, 3],
            [1, 9, 7, 8, 3, 4, 5, 6, 2],
            [8, 2, 6, 1, 9, 5, 3, 4, 7],
            [3, 7, 4, 6, 8, 2, 9, 1, 5],
            [9, 5, 1, 7, 4, 3, 6, 2, 8],
            [5, 1, 9, 3, 2, 6, 8, 7, 4],
            [2, 4, 8, 9, 5, 7, 1, 3, 6],
            [7, 6, 3, 4, 1, 8, 2, 5, 9]
        ]
    },
    {
        puzzle: [
            [0, 2, 0, 6, 0, 8, 0, 0, 0],
            [5, 8, 0, 0, 0, 9, 7, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0, 0],
            [3, 7, 0, 0, 0, 0, 5, 0, 0],
            [6, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 8, 0, 0, 0, 0, 1, 3],
            [0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 9, 8, 0, 0, 0, 3, 6],
            [0, 0, 0, 3, 0, 6, 0, 9, 0]
        ],
        solution: [
            [1, 2, 3, 6, 7, 8, 9, 4, 5],
            [5, 8, 4, 2, 3, 9, 7, 6, 1],
            [9, 6, 7, 1, 4, 5, 3, 2, 8],
            [3, 7, 2, 4, 6, 1, 5, 8, 9],
            [6, 9, 1, 5, 8, 3, 2, 7, 4],
            [4, 5, 8, 7, 9, 2, 6, 1, 3],
            [8, 3, 6, 9, 2, 4, 1, 5, 7],
            [2, 1, 9, 8, 5, 7, 4, 3, 6],
            [7, 4, 5, 3, 1, 6, 8, 9, 2]
        ]
    }
];

let currentPuzzleIndex = 0;

// Render the Sudoku grid
function renderSudoku() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';
    const puzzle = puzzles[currentPuzzleIndex].puzzle;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellValue = puzzle[row][col];
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            if (cellValue !== 0) {
                cell.textContent = cellValue;
                cell.classList.add('fixed');
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.oninput = (e) => {
                    const value = e.target.value;
                    if (!/^[1-9]$/.test(value)) {
                        e.target.value = '';
                    }
                };
                cell.appendChild(input);
            }
            grid.appendChild(cell);
        }
    }
}

// Check if the user's solution is correct
function checkSolution() {
    const grid = document.getElementById('sudoku-grid');
    const cells = grid.getElementsByClassName('sudoku-cell');
    const solution = puzzles[currentPuzzleIndex].solution;
    let isCorrect = true;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = cells[row * 9 + col];
            const input = cell.querySelector('input');
            if (input) {
                const userValue = parseInt(input.value, 10);
                if (userValue === solution[row][col]) {
                    cell.classList.add('correct');
                } else {
                    cell.classList.add('incorrect');
                    isCorrect = false;
                }
            }
        }
    }

    setTimeout(() => {
        const cells = grid.getElementsByClassName('sudoku-cell');
        for (let cell of cells) {
            cell.classList.remove('correct', 'incorrect');
        }
    }, 5000);

    if (isCorrect) {
        alert('You win the game!');
    } else {
        alert('Please check one more time.');
    }
}

// Switch to the next puzzle
function nextPuzzle() {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
    renderSudoku();
}

// Switch to the previous puzzle
function previousPuzzle() {
    currentPuzzleIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
    renderSudoku();
}

// Initialize the game
renderSudoku();