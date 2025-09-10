package cobymurphy.api.accounts.dto;

import cobymurphy.api.accounts.model.Users;
import jakarta.persistence.ManyToMany;

import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SettingsDto {

    public SettingsDto(String username, String givenName, String familyName, String email, String bio) {
        this.username = username;
        this.givenName = givenName;
        this.familyName = familyName;
        this.emailAddress = email;
        this.bio = bio;
    }

    private String username;
    private String givenName;
    private String familyName;
    private String emailAddress;
    private String bio;
    Set<Users> Following = new HashSet<>();
    @ManyToMany
    Set<Users> Followers = new HashSet<>();

}
