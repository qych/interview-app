import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { env } from '../env';
import { useHeaderHeight, usePageWrapperSize, useWindowSize } from '../hooks';
import { PageWrapper } from '../containers/layout';
import { publicRoutes } from './public';
import { Url } from '../constants';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const MainRouter = () => {

  const { windowHeight }  = useWindowSize();
  const { headerHeight } = useHeaderHeight();
  const { pageWrapperPaddingY  } = usePageWrapperSize();

  const renderFallback = () => {
    if (publicRoutes.some(({ path }) => window.location.pathname === `${env.server.path}${path}`)) {
      return <div style={{ minHeight: windowHeight }}><Spin className="flex-center min-h-inherit" size="large" /></div>;
    }
    return <PageWrapper><div style={{ minHeight: windowHeight - headerHeight - pageWrapperPaddingY }}><Spin className="flex-center min-h-inherit" size="large" /></div></PageWrapper>;
  };

  return (
    <BrowserRouter basename={env.server.path}>
      <Suspense fallback={renderFallback()}>
        <Routes>
          <Route path="/" element={<Navigate to={Url.CLASSES} replace />} />
          {publicRoutes.map(({ path, children }, i) =>
            <Route key={i} path={path} element={children} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
