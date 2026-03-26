import { useState } from 'react';
import '../styles/pagination.css';
import { useMemo } from 'react';

const totalPages = 20;

function Pagination() {
  const [active, setActive] = useState(1);

  const pages = useMemo(() => {
    const res = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) res.push(i);
      return res;
    }
    if (active <= 3) {
      res.push(1, 2, 3, 4, '...', totalPages);
      return res;
    }
    if (active >= totalPages - 2) {
      res.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      return res;
    }
    res.push(1, '...', active - 1, active, active + 1, '...', totalPages);
    return res;
  }, [active]);
  return (
    <div className='pagination-container'>
      <div className='pagination-btn-container'>
        <button
          className='pagination-btn pagination-nav-btn'
          disabled={active === 1}
          onClick={() => setActive(prev => Math.max(1, prev - 1))}
        >
          Prev
        </button>
        {pages.map((item, idx) => {
          if (item === '...') {
            return <span key={idx}>{item}</span>
          }
          return <button
            key={idx}
            className={`pagination-btn ${active === item ? 'active-btn' : ''}`}
            onClick={() => setActive(item)}>
            {item}
          </button>
        })}
        <button
          className='pagination-btn pagination-nav-btn'
          disabled={active === totalPages}
          onClick={() => setActive(prev => Math.min(totalPages, prev + 1))}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination;


// return (
//     <div className='pagination-container'>
//       <div className='pagination-btn-container'>
//         <button
//           className='pagination-btn pagination-nav-btn'
//           disabled={active === 1}
//           onClick={() => setActive(prev => Math.max(1, prev - 1))}
//         >
//           Prev
//         </button>
//         {pages.map((item, idx) => {
//           if (item === '...') {
//             return <span key={idx}>{item}</span>
//           }
//           return (
//             <button
//               key={idx}
//               className={`pagination-btn ${active === item ? 'active-btn' : ''}`}
//               onClick={() => setActive(item)}
//             >
//               {item}
//             </button>
//           )
//         })}
//         <button
//           className='pagination-btn pagination-nav-btn'
//           disabled={active === totalPages}
//           onClick={() => setActive(prev => Math.min(totalPages, prev + 1))}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )