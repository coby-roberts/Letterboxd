package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.WatchedEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface WatchedDao extends JpaRepository<WatchedEntry, Long> {

    List<WatchedEntry> findByUser_Username(String username);

}
