package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.FilmDto;
import cobymurphy.api.accounts.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FilmController {

    @Autowired
    FilmService filmService;

    @GetMapping("/film/{id}")
    public ResponseEntity<FilmDto> find(@PathVariable long id) {
        return ResponseEntity.ok(filmService.findFilmById(id));
    }
}