import { useState } from 'react';
import '../styles/test.css';


function Square({ winner, onClick, value }) {

  const isDisabled = value !== null || winner !== 'None';

  return (<button
    className='square'
    onClick={onClick}
    disabled={isDisabled}
  >
    {value}
  </button>)
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
    [6, 4, 2]
  ]

  const onReset = () => {

  }

  const onClick = () => {

  }

  return (<div className="game-board">
    <div id='status-area' className='status game-status'>
      Next Player: <span>{player === 'X' ? 'O' : 'X'}</span>
    </div>
    <div id='winner-area' className='winner game-status'>
      Winner: {winner}
    </div>
    <button className='game-reset-btn' onClick={onReset}>
      Reset
    </button>
    <div className='board-grid'>
      <div className='board-row'>
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
      <div className='board-row'>
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
      <div className='board-row'>
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
  </div>)
}


function Test() {
  return (<div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>)
}

export default Test;