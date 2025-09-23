package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.FilmDto;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.repository.FilmDao;
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

    public Film findByIdOrCreate(FilmDto filmDto) {
        return filmDao.findById(filmDto.getId())
                .orElseGet(() -> addFilm(filmDto));
    }


    public Film addFilm(FilmDto filmDto) {
        Film film = filmDto.convertToFIlm();
        return filmDao.save(film);
    }

}
