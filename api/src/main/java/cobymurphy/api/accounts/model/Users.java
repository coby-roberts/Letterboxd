package cobymurphy.api.accounts.model;

import cobymurphy.api.accounts.dto.ProfileDto;
import cobymurphy.api.accounts.dto.SettingsDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(nullable = false, unique = true, length = 40)
    private String username;
    @Column(nullable = false, length = 64)
    private String password;

    @Column(nullable=false, unique = true)
    private String email;

    @Column(length = 20)
    private String givenName;
    @Column(length = 20)
    private String familyName;
    @Column(length = 300)
    private String bio;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<WatchedEntry> watched = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<DiaryEntry> diary = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<WatchList> lists = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "users_following",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    Set<Users> following = new HashSet<>();

    @ManyToMany(mappedBy = "following")
    Set<Users> followers = new HashSet<>();

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Users() {}

    public Users(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }

    public List<WatchedEntry> getWatched() {
        return watched;
    }

    public void setWatched(List<WatchedEntry> watched) {
        this.watched = watched;
    }

    public List<DiaryEntry> getDiary() {
        return diary;
    }

    public void setDiary(List<DiaryEntry> diary) {
        this.diary = diary;
    }

    public List<WatchList> getWatchlist() {
        return lists;
    }

    public void setWatchlist(List<WatchList> watchlist) {
        this.lists = watchlist;
    }

    public Set<Users> getFollowing() {
        return following;
    }

    public void setFollowing(Set<Users> following) {
        following = following;
    }

    public Set<Users> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<Users> followers) {
        followers = followers;
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public ProfileDto convertToProfileDTO() {
        return new ProfileDto(
                this.getUsername(),
                this.getBio(),
                this.getFollowing(),
                this.getFollowers()
        );
    }

    public SettingsDto convertToSettingsDTO() {
        return new SettingsDto(
                this.getUsername(),
                this.getGivenName(),
                this.getFamilyName(),
                this.getEmail(),
                this.getBio()
        );
    }
}
