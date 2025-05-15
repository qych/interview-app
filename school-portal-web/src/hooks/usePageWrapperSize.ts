import { useState } from 'react';

interface PageWrapperSize {
  pageWrapperPaddingX: number;
  pageWrapperPaddingY: number;
}

export const usePageWrapperSize = () => {

  const [pageWrapperSize] = useState<PageWrapperSize>({ pageWrapperPaddingX: 96, pageWrapperPaddingY: 80 });

  return pageWrapperSize;
};
