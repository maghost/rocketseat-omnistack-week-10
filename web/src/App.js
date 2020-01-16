import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(devData) {
    const { data: newDev } = await api.post('/devs', devData);

    const devIndex = devs.findIndex(
      dev => dev.github_username === newDev.github_username
    );

    if (devIndex === -1) {
      setDevs([...devs, newDev]);
    }
  }

  async function handleRemoveDev(username) {
    const response = await api.delete(`/devs/${username}`);

    if (response.status === 204) {
      const newDevs = devs.filter(dev => dev.github_username !== username);

      setDevs(newDevs);
    }
  }

  return (
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        {devs.length > 0 ? (
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} deleteDev={handleRemoveDev} />
            ))}
          </ul>
        ) : (
          <p>Nenhum desenvolvedor cadastrado.</p>
        )}
      </main>
    </div>
  );
}

export default App;
