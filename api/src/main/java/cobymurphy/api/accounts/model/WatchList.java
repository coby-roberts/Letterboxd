package cobymurphy.api.accounts.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
