import React from 'react';
import './HomeScreen.css'; 

function HomeScreen({ activeUser }) {
    const isActiveUser = activeUser && activeUser.id;
    const name = isActiveUser ? activeUser.name : 'Visitante';

    return (
        <div className="home-container">
            <h1>Bem-vindo!</h1>
            
            <p className="welcome-message">
                Olá, <strong>{name}</strong>. Este aplicativo simula um sistema de suporte de chat para múltiplos usuários.
            </p>
            
            {!isActiveUser ? (
                <div className="alert-box">
                    <strong>IMPORTANTE:</strong> Para começar a interagir, por favor selecione um usuário (A ou B) no menu <strong>"Login"</strong> no canto superior direito.
                </div>
            ) : (
                <div className="status-box">
                    <p>
                        O perfil ativo é <strong>{activeUser.name}</strong>. Agora você pode acessar a <strong>Tela de Chat</strong> ou o <strong>Histórico</strong> para continuar.
                    </p>
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
