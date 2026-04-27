package TestCRUD.CRUD.controller;

import TestCRUD.CRUD.model.Album;
import TestCRUD.CRUD.service.AlbumService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Classe responsável por receber as requisições HTTP e delegar as operações para o serviço
@RestController

//Classe que define o caminho base para as requisições relacionadas a álbuns
@RequestMapping("/albums")

//Permite requisições de origem cruzada (CORS) para o frontend
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:4173"})
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    //Endpoint para criar um novo álbum
    @PostMapping
    public ResponseEntity<Album> salvarAlbum(@RequestBody Album album) {
        if (album.getNomeAlbum() == null || album.getNomeAlbum().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (album.getNomeArtista() == null || album.getNomeArtista().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(albumService.salvarAlbum(album));
    }

    //Endpoint para listar todos os álbuns
    @GetMapping
    public ResponseEntity<List<Album>> listarTodos() {
        return ResponseEntity.ok(albumService.listarTodos());
    }

    //Endpoint para buscar um álbum por ID
    @GetMapping("/{id}")
    public ResponseEntity<Album> buscarPorId(@PathVariable Long id) {
        return albumService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Endpoint para buscar álbuns por nome do artista
    @GetMapping("/artista/{nomeArtista}")
    public ResponseEntity<List<Album>> buscarPorArtista(@PathVariable String nomeArtista) {
        return ResponseEntity.ok(albumService.buscarPorArtista(nomeArtista));
    }

    //Endpoint para buscar álbuns por ano de lançamento
    @GetMapping("/ano/{ano}")
    public ResponseEntity<List<Album>> buscarPorAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(albumService.buscarPorAno(ano));
    }

    //Endpoint para atualizar um álbum existente
    @PutMapping("/{id}")
    public ResponseEntity<Album> atualizarAlbum(@PathVariable Long id, @RequestBody Album album) {

        if (albumService.deletarAlbum(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}