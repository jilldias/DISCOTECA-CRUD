package TestCRUD.CRUD.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "albuns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeAlbum;

    private String nomeArtista;

    private Integer ano;
}