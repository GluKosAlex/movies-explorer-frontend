import { useMemo } from 'react';

export const useCountToShow = (
  width,
  { tabletWidth, desktopWidth },
  { mobileCount, tabletCount, desktopCount },
  { mobileStep, tabletStep, desktopStep },
) => {
  const nextCount = useMemo(() => {
    if (width >= tabletWidth && width < desktopWidth) {
      return tabletStep;
    } else if (width >= desktopWidth) {
      return desktopStep;
    } else return mobileStep;
  }, [width]);

  const initialCount = useMemo(() => {
    if (width >= tabletWidth && width < desktopWidth) {
      return tabletCount;
    } else if (width >= desktopWidth) {
      return desktopCount;
    } else return mobileCount;
  }, [width]);

  return { initialCount, nextCount };
};
