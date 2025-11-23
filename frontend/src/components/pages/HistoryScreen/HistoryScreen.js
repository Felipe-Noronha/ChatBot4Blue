import React, { useState, useMemo } from 'react';
import { useHistory } from '../../../hooks/useHistory';
import './HistoryScreen.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HistoryScreen({ activeUser, getHistoryUseCase }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const filters = useMemo(() => {
    const currentFilters = {};
    if (startDate) currentFilters.start_date = startDate.toISOString().split('T')[0];
    if (endDate) currentFilters.end_date = endDate.toISOString().split('T')[0];
    return currentFilters;
  }, [startDate, endDate]);

  const { history, loading } = useHistory(getHistoryUseCase, activeUser, filters, setError);

  if (loading) return <p>Loading history...</p>;

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setError('');
  };

  return (
    <div className="history-container">
      <h2>Histórico de mensagens - {activeUser.name}</h2>

      <div className="history-filters">
        <div className="filter-group">
          <label>De:</label>
          <ReactDatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            maxDate={new Date()}
            placeholderText="DD/MM/AAAA"
            className="custom-datepicker"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="filter-group">
          <label>Até:</label>
          <ReactDatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            maxDate={new Date()}
            placeholderText="DD/MM/AAAA"
            className="custom-datepicker"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <button
          onClick={clearFilters}
          style={{ display: (startDate || endDate) ? 'inline-block' : 'none' }}
        >
          Limpar Filtros
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {history.length === 0 && !error ? (
        <p>Nenhuma mensagem encontrada para esse usuário.</p>
      ) : (
        history.map(msg => (
          <div key={msg.id} className="history-item">
            <p><strong>Mensagem ({msg.user_name}):</strong> {msg.text}</p>
            <p className="bot-response"><strong>Resposta:</strong> {msg.response}</p>
            <small>
              Enviada em: {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Date unavailable'}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryScreen;