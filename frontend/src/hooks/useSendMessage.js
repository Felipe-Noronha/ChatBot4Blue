import { useState } from 'react';

export const useSendMessage = (sendMessageUseCase, user) => {
  const [response, setResponse] = useState(null);

  const send = async (text) => {
    if (!sendMessageUseCase) throw new Error("sendMessageUseCase is undefined");
    const res = await sendMessageUseCase.execute(user, text);
    setResponse(res);
    return res;
  };

  return [response, send];
};
