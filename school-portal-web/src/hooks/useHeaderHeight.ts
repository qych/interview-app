import { useState } from 'react';

export const useHeaderHeight = () => {
  const [headerHeight] = useState<number>(64);

  return { headerHeight };
};
