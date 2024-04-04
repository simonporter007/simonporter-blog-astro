import { useEffect, useState } from 'react';
import debounce from 'just-debounce';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window?.innerWidth < 640);
    };
    window?.addEventListener('resize', debounce(updateSize, 250));
    updateSize();

    return (): void => window?.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
}
