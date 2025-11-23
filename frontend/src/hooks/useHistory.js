import { useState, useEffect } from 'react';

export const useHistory = (getHistoryUseCase, user, filters, setValidationError) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoading(true);
      
      if (setValidationError) setValidationError(null); 

      try {
        const data = await getHistoryUseCase.execute(user, filters);
        setHistory(data);
      } catch (error) {
        if (setValidationError) {
          setValidationError(error.message);
        }
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user, filters, getHistoryUseCase, setValidationError]);

  return { history, loading };
};
