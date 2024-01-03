import React, {} from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true); 
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(squaresIndex) {
    if (squares[squaresIndex] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[squaresIndex] = "X";
    } else {
      nextSquares[squaresIndex] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const gameWinner = calculateWinner(squares);
  let gameStatus;
  if (gameWinner) {
    gameStatus = "Winner: " + gameWinner;
  } else {
    gameStatus = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <React.Fragment>
      <div className="gameStatus">{gameStatus}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </React.Fragment>
  );

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let lineToCompareTo = 0; lineToCompareTo < lines.length; lineToCompareTo++) {
    const [firstSquaresIndexInLineToCompareTo, secondSquaresIndexInLineToCompareTo, thirdSquaresIndexInLineToCompareTo] = lines[lineToCompareTo];
    if (squares[firstSquaresIndexInLineToCompareTo] && squares[firstSquaresIndexInLineToCompareTo] === squares[secondSquaresIndexInLineToCompareTo] && squares[firstSquaresIndexInLineToCompareTo] === squares[thirdSquaresIndexInLineToCompareTo]) {
      return squares[firstSquaresIndexInLineToCompareTo];
    }
  }
  return null;
}
}