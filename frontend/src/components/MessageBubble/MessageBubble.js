import React from 'react';
import './MessageBubble.css';

function BalaoMensagem({ texto, isUser, aguardandoResposta = false }) {
    
    const classeAlinhamento = isUser ? 'balao-usuario' : 'balao-bot';
    const classesFinais = `balao ${classeAlinhamento}`;

    return (
        <div className={classesFinais}>
            <p className="texto-mensagem">
                {texto}
                {aguardandoResposta && <span className="ponto-carregando">...</span>}
            </p>
        </div>
    );
}

export default BalaoMensagem;
