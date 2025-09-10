package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmDao extends JpaRepository<Film, Long> {

    Optional<Film> findByTitle(String title);

}



