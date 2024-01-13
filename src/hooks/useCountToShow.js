import { useState, useEffect } from 'react';

export const useCountToShow = (
  width,
  { tabletWidth, desktopWidth },
  { mobileStep, tabletStep, desktopStep },
) => {
  const [nextCount, setNextCount] = useState(); // Count of movies to show

  useEffect(() => {
    if (width >= tabletWidth) {
      setNextCount(tabletStep);
    }
    if (width >= desktopWidth) {
      setNextCount(desktopStep);
    }
    setNextCount(mobileStep);
  }, [width, tabletWidth, desktopWidth, mobileStep, tabletStep, desktopStep]);

  return { nextCount };
};
