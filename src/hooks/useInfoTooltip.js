import { useState } from 'react';

import successIcon from './../images/icon-success.svg';

const useInfoTooltip = () => {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipContent, setInfoTooltipContent] = useState({ icon: successIcon, text: '' });

  return { isInfoTooltipOpen, setIsInfoTooltipOpen, infoTooltipContent, setInfoTooltipContent };
};

export { useInfoTooltip };
