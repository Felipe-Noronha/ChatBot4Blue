import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useActiveUser } from './hooks/useActiveUser';
import UserNavbar from './components/UserNavbar/UserNavbar';
import HomeScreen from './components/pages/HomeScreen/HomeScreen';
import ChatScreen from './components/pages/ChatScreen/ChatScreen';
import HistoryScreen from './components/pages/HistoryScreen/HistoryScreen';
import './styles/global.css';
import LogoApp from './assets/logo/logo.png';
import { MessageApi } from './infrastructure/api/MessageApi';
import { SendMessage } from './usecases/SendMessage';
import { GetHistory } from './usecases/GetHistory';

function App() {
  const { activeUser, selectUser, AVAILABLE_PROFILES } = useActiveUser();
  const isUserActive = activeUser?.id;

  const messageApi = new MessageApi();
  const sendMessageUseCase = new SendMessage(messageApi);
  const getHistoryUseCase = new GetHistory(messageApi);

  return (
    <Router>
      <header className="app-header">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/" className="navbar-logo-link">
              <img src={LogoApp} alt="Chatbot Logo" className="navbar-logo-img" />
            </Link>
            <Link to="/chat">Chat</Link>
            <Link to="/history">Histórico</Link>
          </div>

          <UserNavbar
            activeUser={activeUser}
            selectUser={selectUser}
            availableProfiles={AVAILABLE_PROFILES}
          />
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomeScreen activeUser={activeUser} />} />
          <Route
            path="/chat"
            element={isUserActive ? <ChatScreen activeUser={activeUser} sendMessageUseCase={sendMessageUseCase} /> : <Navigate to="/" />}
          />
          <Route
            path="/history"
            element={isUserActive ? <HistoryScreen activeUser={activeUser} getHistoryUseCase={getHistoryUseCase} /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
