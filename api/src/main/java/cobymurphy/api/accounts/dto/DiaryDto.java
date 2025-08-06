package cobymurphy.api.accounts.dto;

import java.time.LocalDate;

public class DiaryDto {

    private long entry_id;
    private String username;
    private long film_id;
    private LocalDate watchDate;
    private int rating;
    private String review;

    public long getEntryId() {
        return entry_id;
    }

    public void setEntryId(long entry_id) {
        this.entry_id = entry_id;
    }

    public String getUser() {
        return username;
    }

    public void setUser(String username) {
        this.username = username;
    }

    public long getFilmId() {
        return film_id;
    }

    public void setFilmId(long film_id) {
        this.film_id = film_id;
    }

    public LocalDate getWatchDate() {
        return watchDate;
    }

    public void setWatchDate(LocalDate watchDate) {
        this.watchDate = watchDate;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
