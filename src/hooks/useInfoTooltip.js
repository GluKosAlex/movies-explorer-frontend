import { useState } from 'react';

const useInfoTooltip = (defaultText) => {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipState, setInfoTooltipState] = useState({ success: false, text: defaultText });

  console.log(infoTooltipState);

  return { isInfoTooltipOpen, setIsInfoTooltipOpen, infoTooltipState, setInfoTooltipState };
};

export { useInfoTooltip };
