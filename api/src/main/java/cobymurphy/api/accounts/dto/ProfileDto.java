package cobymurphy.api.accounts.dto;


import cobymurphy.api.accounts.model.Users;

import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {
    private long id;
    private String username;
    private String bio;
    Set<SimpleUserDto> Following = new HashSet<>();
    Set<SimpleUserDto> Followers = new HashSet<>();

}