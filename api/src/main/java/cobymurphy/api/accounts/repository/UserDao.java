package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<Users, Long> {

    Optional<Users> findByUsername(String username);
    boolean existsByUsername(String username);
    Page<Users> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
