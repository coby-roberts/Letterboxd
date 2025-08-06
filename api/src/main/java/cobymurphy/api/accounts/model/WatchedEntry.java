package cobymurphy.api.accounts.model;

import cobymurphy.api.film.model.Film;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class WatchedEntry {

    @Id
    @GeneratedValue
    private long watched_id;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToOne
    @JoinColumn(name = "film_id")
    private Film film;

    private int rating;

    public WatchedEntry() {}
    public WatchedEntry(Users user, Film film, int rating) {
        this.user = user;
        this.film = film;
        this.rating = rating;
    }

    public long getWatched_id() {
        return watched_id;
    }

    public void setWatched_id(long watched_id) {
        this.watched_id = watched_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
