package cobymurphy.api.accounts.dto;


import cobymurphy.api.accounts.model.Users;

import java.util.HashSet;
import java.util.Set;

public class ProfileDto {

    private String username;

    private String bio;

    Set<Users> Following = new HashSet<>();
    Set<Users> Followers = new HashSet<>();

    public ProfileDto() {}

    public ProfileDto(String username, String bio, Set<Users> following, Set<Users> followers) {
        this.username = username;
        this.bio = bio;
        this.Following = following;
        this.Followers = followers;
    }

    public Set<Users> getFollowing() {
        return Following;
    }

    public void setFollowing(Set<Users> following) {
        Following = following;
    }

    public Set<Users> getFollowers() {
        return Followers;
    }

    public void setFollowers(Set<Users> followers) {
        Followers = followers;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}