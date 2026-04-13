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