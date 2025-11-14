"use client";
import React, { createContext, useContext, useState } from 'react';
import Loader from '@/app/components/Loader';

// Create context
const GlobalLoaderContext = createContext();

// Provider component
export const GlobalLoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const showLoader = (message = "Loading...") => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <GlobalLoaderContext.Provider value={{ showLoader, hideLoader, loading }}>
      {children}
      {loading && <Loader message={loadingMessage} />}
    </GlobalLoaderContext.Provider>
  );
};

// Custom hook to use the loader context
export const useGlobalLoader = () => {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error('useGlobalLoader must be used within a GlobalLoaderProvider');
  }
  return context;
};

export default GlobalLoaderContext;