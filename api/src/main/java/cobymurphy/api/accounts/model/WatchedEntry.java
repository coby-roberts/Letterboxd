package cobymurphy.api.accounts.model;

import cobymurphy.api.accounts.dto.WatchedDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

    public WatchedEntry(Users user, Film film, int rating) {
        this.user = user;
        this.film = film;
        this.rating = rating;
    }

    public WatchedDto convertToDto() {
        return new WatchedDto(
                this.getWatched_id(),
                this.getUser().getUsername(),
                this.getFilm().getId(),
                this.getRating()
        );
    }
}
