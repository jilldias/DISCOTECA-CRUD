import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [albums, setAlbums] = useState([]);
  const [nomeAlbum, setNomeAlbum] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");

  const carregarAlbuns = async () => {
    const response = await api.get("/albums");
    setAlbums(response.data);
  };

  useEffect(() => {
    carregarAlbuns();
  }, []);

  const salvarAlbum = async () => {
    await api.post("/albums", {
      nomeAlbum,
      artista,
      ano
    });

    setNomeAlbum("");
    setArtista("");
    setAno("");

    carregarAlbuns();
  };

  const deletarAlbum = async (id) => {
    await api.delete(`/albums/${id}`);
    carregarAlbuns();
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

      <button onClick={salvarAlbum}>Salvar</button>

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.nomeAlbum} - {album.artista} ({album.ano})
            <button onClick={() => deletarAlbum(album.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;