package cobymurphy.api.film.service;

import cobymurphy.api.film.dto.FilmDto;
import cobymurphy.api.film.model.Film;
import cobymurphy.api.film.repository.FilmDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FilmService {

    @Autowired
    FilmDao filmDao;

    public FilmDto findFilmByTitle(String title) {
        return filmDao.findByTitle(title)
                .map(Film::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Film title not found: " + title));
    }

    public FilmDto findFilmById(long id) {
        return filmDao.findById(id)
                .map(Film::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Film Id not found: " + id));
    }

}
