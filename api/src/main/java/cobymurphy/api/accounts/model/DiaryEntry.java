package cobymurphy.api.accounts.model;

import cobymurphy.api.accounts.dto.DiaryDto;
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
    private Integer rating;
    private String review;

//    public DiaryEntry(Users user, Film film, LocalDate watchDate) {
//        this.user = user;
//        this.film = film;
//        this.
//    }

    public DiaryDto convertToDto() {
        return new DiaryDto(
                this.getEntry_id(),
                this.getUser().getUsername(),
                this.getFilm().getId(),
                this.getWatchDate(),
                this.getRating(),
                this.getReview()
        );
    }

}