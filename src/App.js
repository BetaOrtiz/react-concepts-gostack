import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => setRepos(response.data))

  }, [])

  async function handleAddRepository() {
   const response = await api.post('/repositories', {title: 'Sample Repo', url: 'sample url', techs: ['Sample techs']});
   setRepos ([...repos, response.data])
  
  }


  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    setRepos(repos.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => ( <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>) )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
