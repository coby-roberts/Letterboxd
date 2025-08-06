package cobymurphy.api.accounts.model;

import cobymurphy.api.film.model.Film;
import jakarta.persistence.*;

@Entity
public class ListEntry {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "watchlist_id")
    private WatchList watchList;

    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;

    private String list_name;

    public ListEntry() { }

    public ListEntry(WatchList watchList, Film film, String list_name) {
        this.watchList = watchList;
        this.film = film;
        this.list_name = list_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WatchList getWatchList() {
        return watchList;
    }

    public void setWatchList(WatchList watchList) {
        this.watchList = watchList;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public String getList_name() {
        return list_name;
    }

    public void setList_name(String list_name) {
        this.list_name = list_name;
    }
}
