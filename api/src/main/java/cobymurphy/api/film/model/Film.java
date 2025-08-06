package cobymurphy.api.film.model;

import cobymurphy.api.film.dto.FilmDto;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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

//    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
//    private List<ListEntry> watchlistedBy = new ArrayList<>();

    public Film() {}
    public Film(long id, String title, String release_date,
                String director, String producer, String original_language,
                String overview, List<String> cast, String backdrop_path,
                String poster_path, List<String> genre) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.director = director;
        this.producer = producer;
        this.original_language = original_language;
        this.overview = overview;
        this.cast = cast;
        this.backdrop_path = backdrop_path;
        this.poster_path = poster_path;
        this.genre = genre;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getOriginal_language() {
        return original_language;
    }

    public void setOriginal_language(String original_language) {
        this.original_language = original_language;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public String getBackdrop_path() {
        return backdrop_path;
    }

    public void setBackdrop_path(String backdrop_path) {
        this.backdrop_path = backdrop_path;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public List<String> getGenre() {
        return genre;
    }

    public void setGenre(List<String> genre) {
        this.genre = genre;
    }

//    public List<ListEntry> getWatchlistedBy() {
//        return watchlistedBy;
//    }
//
//    public void setWatchlistedBy(List<ListEntry> watchlistedBy) {
//        this.watchlistedBy = watchlistedBy;
//    }
//

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
