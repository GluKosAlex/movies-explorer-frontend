import { useCallback, useEffect } from 'react';

export default function useOutsideClick(handleClose, targetClass) {
  const handleClick = useCallback(
    (event) => {
      if (event.target.classList.contains(targetClass)) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
}
