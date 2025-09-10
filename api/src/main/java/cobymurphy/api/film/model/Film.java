package cobymurphy.api.film.model;
import cobymurphy.api.film.dto.FilmDto;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Film {

    @Id
    private long id;
    private String title;
    private String release_date;
    private String director;
    private String producer;
    private String original_language;
    private String overview;
    @ElementCollection
    @Column(name = "film_cast")
    List<String> cast;
    private String backdrop_path;
    private String poster_path;
    @ElementCollection
    @Column(name = "genre")
    List<String> genre = new ArrayList<>();

    public FilmDto convertToDTO() {
        return new FilmDto(
                this.getId(),
                this.getTitle(),
                this.getRelease_date(),
                this.getDirector(),
                this.getProducer(),
                this.getOriginal_language(),
                this.getOverview(),
                this.getCast(),
                this.getBackdrop_path(),
                this.getPoster_path(),
                this.getGenre()
        );
    }
}


//    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
//    private List<ListEntry> watchlistedBy = new ArrayList<>();

//    public List<ListEntry> getWatchlistedBy() {
//        return watchlistedBy;
//    }
//
//    public void setWatchlistedBy(List<ListEntry> watchlistedBy) {
//        this.watchlistedBy = watchlistedBy;
//    }
//