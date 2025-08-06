package cobymurphy.api.film.controller;

import cobymurphy.api.film.dto.FilmDto;
import cobymurphy.api.film.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FilmController {

    @Autowired
    FilmService filmService;

    @GetMapping("/film/{title}")
    public ResponseEntity<FilmDto> find(@PathVariable String title) {
        return ResponseEntity.ok(filmService.findFilmByTitle(title));
    }

}
