import { useState } from 'react';

export function useActiveUser() {
  const [activeUser, setActiveUser] = useState(null);
  const AVAILABLE_PROFILES = {
    1: { id: 1, name: 'Usuário A' },
    2: { id: 2, name: 'Usuário B' },
  };

  const selectUser = (id) => {
    setActiveUser(AVAILABLE_PROFILES[id]);
  };

  return {
    activeUser,
    selectUser,
    AVAILABLE_PROFILES,
  };
}
