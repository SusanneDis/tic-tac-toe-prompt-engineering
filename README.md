# Tic Tac Toe

A classic two-player Tic Tac Toe game built with plain HTML, CSS, and JavaScript – no frameworks, no build tools.

## Features

- 3×3 board rendered with JavaScript
- Two players take turns (starts with **O**, then **X**)
- Animated SVG symbols for O (a drawn circle) and X (two lines drawn one after another)
- Automatic win detection for rows, columns, and diagonals
- Animated win line connecting the three winning cells
- All cells are locked once the game is over
- **"Neues Spiel"** (New Game) button resets the board
- Responsive layout (smaller cells on screens up to 390px wide)

## Usage

No server or installation required:

1. Clone or download the repository
2. Open `index.html` in a browser

## How to Play

1. Player **O** goes first and clicks an empty cell.
2. Player **X** is next. Players alternate automatically.
3. Occupied cells cannot be clicked again.
4. Once a player has three symbols in a row, column, or diagonal, the win line is drawn after a short delay and the board is locked.
5. **"Neues Spiel"** clears the board and O starts again.

## Project Structure

| File          | Description                                                                     |
|---------------|-------------------------------------------------------------------------------|
| `index.html`  | Base markup: heading, container for the board, and reset button              |
| `style.css`   | Styling for the board, symbols, button, and responsive adjustments          |
| `script.js`   | Game logic: rendering, move handling, win check, win line, reset            |
| `img/`        | Folder for image assets                                                      |

## Key Functions in `script.js`

- `render()` – builds the board table from the `fields` array
- `handleClick(idx, tdElem)` – handles a move, places the symbol, and switches player
- `checkGameOver()` – checks all eight winning combinations and returns the winning combo
- `drawWinLine(combo)` – draws an SVG overlay as the win line across the affected cells
- `disableAllClicks()` – disables all cells once the game is over
- `generateAnimatedCircleSVG()` / `generateAnimatedXSVG()` – create the animated symbols
- `resetGame()` – resets the board, current player, and win line

## Tech

- HTML5, CSS3 (Flexbox, media queries)
- Vanilla JavaScript (ES6)
- Inline SVG with SMIL animations (`<animate>`)

## Possible Improvements

- Show the current player and the score
- Draw detection ("no winner")
- Score counter across multiple rounds
- Computer opponent

## Author

Susanne Di Sorbo

## License

Released under the [MIT License](LICENSE).
