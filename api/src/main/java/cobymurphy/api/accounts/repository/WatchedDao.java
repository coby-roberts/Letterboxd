package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface WatchedDao extends JpaRepository<WatchedEntry, Long> {

    List<WatchedEntry> findByUser_Username(String username);
    List<WatchedEntry> findByUser_Id(Long id);

    Optional<WatchedEntry> findByFilm_id(Long id);
    Optional<WatchedEntry> findByUserAndFilm(Users user, Film film);

    Optional<WatchedEntry> findByUser_UserIDAndFilm_FilmId(Long userId, Long filmId);

    int deleteByUser_IdAndFilm_Id(Long userId, Long filmId);

}
