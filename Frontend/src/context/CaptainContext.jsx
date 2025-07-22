import { createContext } from "react"
import React, { useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [captain, setCaptain] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const value = {
    baseUrl,
    captain,
    setCaptain,
    error,
    setError,
    loading,
    setLoading
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}
export default CaptainContext;