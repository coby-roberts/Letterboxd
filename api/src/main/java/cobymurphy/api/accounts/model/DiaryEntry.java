package cobymurphy.api.accounts.model;

import cobymurphy.api.film.model.Film;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DiaryEntry {

    @Id
    @GeneratedValue
    private long entry_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private Users user;

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    @Column(nullable = false)
    private LocalDate watchDate;
    private int rating;
    private String review;

}