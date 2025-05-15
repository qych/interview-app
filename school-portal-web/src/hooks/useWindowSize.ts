import { useState } from 'react';

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
}

export const useWindowSize = () => {

  const { innerWidth, innerHeight } = window;

  const [windowSize] = useState<WindowSize>({ windowWidth: innerWidth, windowHeight: innerHeight });

  return windowSize;
};
