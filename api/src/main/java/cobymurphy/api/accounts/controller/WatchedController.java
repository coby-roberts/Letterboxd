package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.WatchedDto;
import cobymurphy.api.accounts.dto.WatchedFilmDto;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.services.FilmService;
import cobymurphy.api.accounts.services.UserService;
import cobymurphy.api.accounts.services.WatchedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
public class WatchedController {

    @Autowired
    UserService userService;

    @Autowired
    WatchedService watchedService;

    @Autowired
    FilmService filmService;

    /**
     * Returns a List of films watched by the user
     * @param username The username who's watched movies you want to receive
     * @return Returns a list of Films watched by the username
     */
    @GetMapping("/{username}/films")
    public ResponseEntity<List<WatchedEntry>> getWatchedFilms(@PathVariable String username) {
        return ResponseEntity.ok(watchedService.findAllWatchedEntryByUserUsername(username));
    }

    @PostMapping("/{username}/watched")
    public ResponseEntity<WatchedDto> updateWatchedEntry(@RequestBody WatchedFilmDto watchedFilmDto,
                                                         Principal principal,
                                                         UriComponentsBuilder ucb) {

        Users user = userService.findByUsername(principal.getName());
        Film film = filmService.findByIdOrCreate(watchedFilmDto.getFilm());
        WatchedEntry watchedEntry = watchedService.findAndUpdateOrCreate(user, film, watchedFilmDto.getWatched().getRating());

        URI location = ucb
                .path("users/{username}/watched")
                .buildAndExpand(principal.getName())
                .toUri();

        return ResponseEntity.created(location).body(watchedEntry.convertToDto());
    }
}
