import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [albums, setAlbums] = useState([]);
  const [nomeAlbum, setNomeAlbum] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [editingId, setEditingId] = useState(null);

  const api = "http://localhost:8080/albums";

  useEffect(() => {
    carregarAlbuns();
  }, []);

  const carregarAlbuns = async () => {
    const response = await axios.get(api);
    setAlbums(response.data);
  };

  const salvarAlbum = async () => {
    const album = {
      nomeAlbum,
      artista,
      ano
    };

    if (editingId) {
      await axios.put(`${api}/${editingId}`, album);
      setEditingId(null);
    } else {
      await axios.post(api, album);
    }

    limparCampos();
    carregarAlbuns();
  };

  const excluirAlbum = async (id) => {
    await axios.delete(`${api}/${id}`);
    carregarAlbuns();
  };

  const editarAlbum = (album) => {
    setNomeAlbum(album.nomeAlbum);
    setArtista(album.artista);
    setAno(album.ano);
    setEditingId(album.id);
  };

  const limparCampos = () => {
    setNomeAlbum("");
    setArtista("");
    setAno("");
  };

  return (
    <div>
      <h1>CRUD de Álbuns</h1>

      <input
        type="text"
        placeholder="Nome do álbum"
        value={nomeAlbum}
        onChange={(e) => setNomeAlbum(e.target.value)}
      />

      <input
        type="text"
        placeholder="Artista"
        value={artista}
        onChange={(e) => setArtista(e.target.value)}
      />

      <input
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <button onClick={salvarAlbum}>
        {editingId ? "Atualizar" : "Salvar"}
      </button>

      <hr />

      {albums.map((album) => (
        <div key={album.id}>
          <strong>{album.nomeAlbum}</strong> - {album.artista} ({album.ano})

          <button onClick={() => editarAlbum(album)}>
            Editar
          </button>

          <button onClick={() => excluirAlbum(album.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;