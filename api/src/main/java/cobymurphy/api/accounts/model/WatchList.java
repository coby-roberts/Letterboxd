package cobymurphy.api.accounts.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class WatchList {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToMany(mappedBy = "watchList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ListEntry> entries = new ArrayList<>();

    public WatchList() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<ListEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<ListEntry> entries) {
        this.entries = entries;
    }



}
