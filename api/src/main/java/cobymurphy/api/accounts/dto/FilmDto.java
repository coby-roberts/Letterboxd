package cobymurphy.api.accounts.dto;

import cobymurphy.api.accounts.model.Film;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmDto {

    private long id;
    private String title;
    private String release_date;
    private String director;
    private String producer;
    private String original_language;
    private String overview;
    List<String> cast;
    private String backdrop_path;
    private String poster_path;
    List<String> genre;

    public Film convertToFIlm() {
        return new Film(
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
