package cobymurphy.api.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryFilmDto {
    private DiaryDto diaryDto;
    private FilmDto filmDto;
}
