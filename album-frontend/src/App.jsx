import { useEffect, useState } from 'react'
import api from './services/api'
import './App.css'

function App() {
  const [albums, setAlbums] = useState([])
  const [nomeAlbum, setNomeAlbum] = useState('')
  const [nomeArtista, setNomeArtista] = useState('')
  const [ano, setAno] = useState('')

  const carregarAlbuns = async () => {
    try {
      const response = await api.get('/albums')
      setAlbums(response.data)
    } catch (error) {
      console.error('Erro ao carregar álbuns', error)
    }
  }

  useEffect(() => {
    carregarAlbuns()
  }, [])

  const salvarAlbum = async () => {
    try {
      await api.post('/albums', {
        nomeAlbum,
        nomeArtista,
        ano: Number(ano)
      })
      setNomeAlbum('')
      setNomeArtista('')
      setAno('')
      carregarAlbuns()
    } catch (error) {
      console.error('Erro ao salvar álbum', error)
    }
  }

  const deletarAlbum = async (id) => {
    try {
      await api.delete(`/albums/${id}`)
      carregarAlbuns()
    } catch (error) {
      console.error('Erro ao deletar álbum', error)
    }
  }

  return (
    <div className="app-container">
      <h1>CRUD de Álbuns</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nome do álbum"
          value={nomeAlbum}
          onChange={(e) => setNomeAlbum(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome do artista"
          value={nomeArtista}
          onChange={(e) => setNomeArtista(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <button onClick={salvarAlbum}>Salvar</button>
      </div>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            <span>
              {album.nomeAlbum} - {album.nomeArtista} ({album.ano})
            </span>
            <button onClick={() => deletarAlbum(album.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
