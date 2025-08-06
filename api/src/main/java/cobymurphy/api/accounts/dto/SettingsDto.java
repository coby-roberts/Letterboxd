package cobymurphy.api.accounts.dto;

import cobymurphy.api.accounts.model.Users;
import jakarta.persistence.ManyToMany;

import java.util.HashSet;
import java.util.Set;

public class SettingsDto {

    private String username;
    private String givenName;
    private String familyName;
    private String emailAddress;
    private String bio;

    public SettingsDto(String username, String givenName, String familyName, String emailAddress, String bio) {
        this.username = username;
        this.givenName = givenName;
        this.familyName = familyName;
        this.emailAddress = emailAddress;
        this.bio = bio;
    }

    Set<Users> Following = new HashSet<>();

    @ManyToMany
    Set<Users> Followers = new HashSet<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
