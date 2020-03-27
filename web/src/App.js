import React, { useEffect, useState } from 'react';
import api from './services/api';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import '../src/Global.css'
import '../src/App.css'
import '../src/Sidebar.css'
import '../src/Main.css'


function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)

    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {

    var flag = false


    for (var i = 0; i < devs.length; i++) {
      if (devs[i].github_username == data.github_username) {
        flag = true
      }
    }

    if (flag) {
      alert("Já existe um Dev com este username")
    }

    if (flag == false) {

      const response = await api.post('/devs', data)
      setDevs([...devs, response.data])

    }


  }

  return (
    <div id="app">
      <aside>
        <strong >Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id} />
          ))}

        </ul>
      </main>
    </div>
  )
}

export default App;
