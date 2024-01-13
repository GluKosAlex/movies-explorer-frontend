import { useMemo } from 'react';

export const useCountToShow = (
  width,
  { tabletWidth, desktopWidth },
  { mobileStep, tabletStep, desktopStep },
) => {
  const nextCount = useMemo(() => {
    if (width >= tabletWidth) {
      return tabletStep;
    } else if (width >= desktopWidth) {
      return desktopStep;
    } else return mobileStep;
  }, [width]);

  return { nextCount };
};
