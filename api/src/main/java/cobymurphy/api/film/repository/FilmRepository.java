package cobymurphy.api.film.repository;

import cobymurphy.api.film.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

    Optional<Film> findByTitle(String title);

}



