import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getDashboardData } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    getDashboardData().then((payload) => {
      setData(payload);
      setLoading(false);
    });
  }

  useEffect(() => {
    let active = true;
    getDashboardData().then((payload) => {
      if (!active) return;
      setData(payload);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ data, loading, refresh }), [data, loading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useSahrdayaTech() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useSahrdayaTech must be used inside AppProvider');
  return value;
}
