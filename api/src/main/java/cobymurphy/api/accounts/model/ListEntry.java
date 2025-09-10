package cobymurphy.api.accounts.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
