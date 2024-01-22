const CONFIG = {
  shortMovieDuration: 1800,
  screenBreakPoints: {
    mobileWidth: 320,
    tabletWidth: 768,
    desktopWidth: 1280,
  },
  stepsToShow: {
    mobileStep: 5,
    tabletStep: 8,
    desktopStep: 12,
  },
  mainApiConfig: {
    baseUrl: 'https://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  movieApiConfig: {
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export { CONFIG };
