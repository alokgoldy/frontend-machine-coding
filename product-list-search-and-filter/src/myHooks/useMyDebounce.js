import { useState, useEffect } from 'react';

function useMyDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the timeout if value or delay changes
    // This is crucial for the "debounce" effect (cancelling previous timers)
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export default useMyDebounce;
