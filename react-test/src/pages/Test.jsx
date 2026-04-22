import { useState } from 'react';
import '../styles/test.css';

function Square() {
  return (<div>

  </div>)
}

function Board() {
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('None');
  const [board, setBoard] = useState(() => Array(9).fill(null));

  const onClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = player;
  }
  return (
    <div className='game-board'>
      <div className='board-grid'>
        <div className='game-row'>
          <Square
            value={board[0]}
            onClick={() => onClick(1)}
            winner={winner}
          />
        </div>
      </div>
    </div>
  )
}

function Test() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  )
}

export default Test;