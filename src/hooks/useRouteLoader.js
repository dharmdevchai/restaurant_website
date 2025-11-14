"use client";
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGlobalLoader } from '@/app/components/GlobalLoaderContext';

let routeChanging = false;

export const useRouteLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showLoader, hideLoader } = useGlobalLoader();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (!routeChanging) {
        routeChanging = true;
        showLoader('Loading page...');
      }
    };

    const handleRouteChangeComplete = () => {
      if (routeChanging) {
        routeChanging = false;
        hideLoader();
      }
    };

    // Add event listeners for route changes
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);

    // Clean up event listeners
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [showLoader, hideLoader]);

  // Trigger route change events when pathname or searchParams change
  useEffect(() => {
    if (routeChanging) {
      routeChanging = false;
      hideLoader();
    }
  }, [pathname, searchParams, hideLoader]);

  return { showLoader, hideLoader };
};