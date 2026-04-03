import { useState } from 'react';
// import '../styles/tic-tac-toe.css';

function Square({ value, onClick, winner }) {
  const isDisabled = value !== null || winner !== "None"

  return (
    <button
      className='square'
      onClick={() => onClick(value)}
      disabled={isDisabled}
      data-disabled={isDisabled}
    >
      {value}
    </button>
  )
}

function Board() {
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('None');
  const [board, setBoard] = useState(() => Array(9).fill(null));

  const matches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const onReset = () => {
    setBoard(() => Array(9).fill(null));
    setPlayer('X');
    setWinner('None');
  }

  const checkWinner = (newBoard) => {

    for (let i = 0; i < matches.length; i++) {
      const [a, b, c] = matches[i];

      if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === player) {
        return true
      }
    }
    return false;
  }
  const onClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(player);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }

  }

  return (
    <div className='game-board'>
      <div id={'status-area'} className="status game-status">
        Next player: <span>{player === "X" ? "O" : "X"}</span>
      </div>
      <div id="winnerArea" className="winner game-status">
        Winner: <span>{winner}</span>
      </div>
      <button className="game-reset-button" onClick={onReset}>
        Reset
      </button>
      <div className="board-grid">
        <div className="board-row">
          <Square
            value={board[0]}
            onClick={() => onClick(0)}
            winner={winner}
          />
          <Square
            value={board[1]}
            onClick={() => onClick(1)}
            winner={winner}
          />
          <Square
            value={board[2]}
            onClick={() => onClick(2)}
            winner={winner}
          />
        </div>
        <div className="board-row">
          <Square
            value={board[3]}
            onClick={() => onClick(3)}
            winner={winner}
          />
          <Square
            value={board[4]}
            onClick={() => onClick(4)}
            winner={winner}
          />
          <Square
            value={board[5]}
            onClick={() => onClick(5)}
            winner={winner}
          />
        </div>
        <div className="board-row">
          <Square
            value={board[6]}
            onClick={() => onClick(6)}
            winner={winner}
          />
          <Square
            value={board[7]}
            onClick={() => onClick(7)}
            winner={winner}
          />
          <Square
            value={board[8]}
            onClick={() => onClick(8)}
            winner={winner}
          />
        </div>
      </div>

    </div>
  )
}

function TicTacToe() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  )
}

export default TicTacToe;
