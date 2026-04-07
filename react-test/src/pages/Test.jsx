import { useState } from 'react';

function Square() {
  return (
    <div className='square'>
      x
    </div>
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
    [6, 4, 2]
  ]

  return (
    <div className='board-container'>
      <div className='square-container'>
        <Square />
      </div>
    </div>
  )

}

function Test() {
  return (<div className='test'>
    <div className='board'>
      <Board />
    </div>
  </div>)
}

export default Test;