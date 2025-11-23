import React, { useState, useRef, useEffect } from 'react';
import BalaoMensagem from '../../MessageBubble/MessageBubble';
import { useSendMessage } from '../../../hooks/useSendMessage';
import './ChatScreen.css';

function ChatScreen({ activeUser, sendMessageUseCase }) {
  const [input, setInput] = useState('');
  const [localHistory, setLocalHistory] = useState([]);
  const refScroll = useRef(null);
  const [, send] = useSendMessage(sendMessageUseCase, activeUser);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

   const userText = input; 
    const tempId = Date.now();
    
    setLocalHistory(prev => [
      ...prev,
      { id: tempId, texto: userText, isUser: true, aguardandoResposta: true }
    ]);

    setInput('');

    const res = await send(userText); 
    
    setLocalHistory(prev => [
      ...prev.filter(msg => msg.id !== tempId),
      
      { id: res.id, texto: userText, isUser: true, aguardandoResposta: false },
      
      { id: res.id + 0.1, texto: res.response, isUser: false, aguardandoResposta: false }
    ]);
  };

  useEffect(() => {
    if (refScroll.current) refScroll.current.scrollTop = refScroll.current.scrollHeight;
  }, [localHistory]);

  useEffect(() => {
    setLocalHistory([]); 
  }, [activeUser?.id]); 

  return (
    <div className="chat-container">
      <div ref={refScroll} className="area-mensagens-chat"> 
        {localHistory.map(msg => (
          <BalaoMensagem key={msg.id} {...msg} />
        ))}
      </div>
      <form onSubmit={handleSend} className="formulario-chat">
        <input 
            className="input-mensagem" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Digite sua mensagem..."
        />
        <button type="submit" className="botao-enviar">Enviar</button>
      </form>
    </div>
  );
}

export default ChatScreen;