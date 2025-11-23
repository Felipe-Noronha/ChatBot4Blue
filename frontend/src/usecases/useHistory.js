import { useState, useEffect } from 'react';

export const useHistory = (getHistoryUseCase, user, filters, setError) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getHistoryUseCase.execute(user, filters);
        console.log('Resposta da API:', data);
        setHistory(Array.isArray(data) ? data : []);
        if (setError) setError('');
      } catch (err) {
        console.error('Error fetching history via useCase:', err);
        setHistory([]);
        if (setError) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, filters, getHistoryUseCase, setError]);

  return { history, loading };
};
