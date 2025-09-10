package cobymurphy.api.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchedDto {

    private long entry_id;
    private String username;
    private int rating;
}