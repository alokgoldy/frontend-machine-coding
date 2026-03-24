import { useState } from 'react';

function Pagination() {
  const [active, setActive] = useState(0);

  return (
    <div className='pagination-container'>
      <button className='nav-btn'>Prev</button>
      <button className='nav-btn'>Next</button>
    </div>
  )
}

export default Pagination;