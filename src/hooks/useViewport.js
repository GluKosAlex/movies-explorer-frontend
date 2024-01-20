import { useEffect, useRef, useState } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const throttleInProgress = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      // If the state is inProgress — exit the function, skip event processing
      if (throttleInProgress.current) {
        return;
      }
      // Set inProgress to true and start the timer
      throttleInProgress.current = true;
      setTimeout(() => {
        // Set the viewport width
        setWidth(window.innerWidth);
        // Set inProgress to false, which means that setTimeout will work again on the next run
        throttleInProgress.current = false;
      }, 500);
    };

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return { width };
};
