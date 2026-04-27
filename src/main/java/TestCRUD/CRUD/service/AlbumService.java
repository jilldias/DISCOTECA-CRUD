package TestCRUD.CRUD.service;

import TestCRUD.CRUD.model.Album;
import TestCRUD.CRUD.repository.AlbumRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {

    //Acesso ao banco de dados através do repositório
    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public Album salvarAlbum(Album album) {
        return albumRepository.save(album);
    }

    public List<Album> listarTodos() {
        return albumRepository.findAll();
    }

    public Optional<Album> buscarPorId(Long id) {
        return albumRepository.findById(id);
    }

    public List<Album> buscarPorArtista(String nomeArtista) {
        return albumRepository.findByNomeArtista(nomeArtista);
    }

    public List<Album> buscarPorAno(Integer ano) {
        return albumRepository.findByAno(ano);
    }

    public Album atualizarAlbum(Long id, Album novoAlbum) {
        return albumRepository.findById(id).map(album -> {
            album.setNomeAlbum(novoAlbum.getNomeAlbum());
            album.setNomeArtista(novoAlbum.getNomeArtista());
            album.setAno(novoAlbum.getAno());
            return albumRepository.save(album);
        }).orElseThrow(() -> new RuntimeException("Album não encontrado"));
    }

    public boolean deletarAlbum(Long id) {
        if (albumRepository.existsById(id)) {
            albumRepository.deleteById(id);
            return true;
        }
        return false;
    }
}