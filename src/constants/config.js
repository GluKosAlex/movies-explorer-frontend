import { mainApiURL, movieApiURL } from './constants.js';

const CONFIG = {
  shortMovieDuration: 40,
  screenBreakPoints: {
    mobileWidth: 320,
    tabletWidth: 768,
    desktopWidth: 1280,
  },
  initialCountToShow: {
    mobileCount: 5,
    tabletCount: 8,
    desktopCount: 12,
  },
  stepsToShow: {
    mobileStep: 2,
    tabletStep: 2,
    desktopStep: 3,
  },
  mainApiConfig: {
    baseUrl: mainApiURL,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  movieApiConfig: {
    baseUrl: `${movieApiURL}/beatfilm-movies`,
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export { CONFIG };
