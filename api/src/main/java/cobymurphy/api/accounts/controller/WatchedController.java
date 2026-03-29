package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.WatchedDto;
import cobymurphy.api.accounts.dto.WatchedFilmDto;
import cobymurphy.api.accounts.model.CustomUserDetails;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.services.FilmService;
import cobymurphy.api.accounts.services.UserService;
import cobymurphy.api.accounts.services.WatchedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
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

    @GetMapping("/{username}films")
    public ResponseEntity<WatchedEntry> getWatchedEntry(
            @PathVariable String username,
            @RequestParam Long filmId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId();
        WatchedEntry watchedEntry = watchedService.FindWatchedEntryByUserAndFilmId(userId, filmId);
        return ResponseEntity.ok(watchedEntry);
    }

    @PostMapping("/watched")
    public ResponseEntity<WatchedDto> createWatchedEntry(@RequestBody WatchedFilmDto watchedFilmDto,
                                                         @AuthenticationPrincipal CustomUserDetails userDetails,
                                                         UriComponentsBuilder ucb) {

        filmService.findByIdOrCreate(watchedFilmDto.getFilm());

        WatchedEntry watchedEntry = watchedService
                .updateWatchedEntry(userDetails.getId(),
                        watchedFilmDto.getFilm().getId(),
                        watchedFilmDto.getWatched().getRating());

        URI location = ucb
                .path("users/watched/{filmId}")
                .buildAndExpand(watchedFilmDto.getFilm().getId())
                .toUri();

        return ResponseEntity.created(location).body(watchedEntry.convertToDto());
    }

    @DeleteMapping("/watched/{filmId}")
    public ResponseEntity<Void> deleteWatchedEntry(@PathVariable Long filmId,
                                                   @AuthenticationPrincipal CustomUserDetails userDetails) {
        watchedService.deleteWatchedEntry(userDetails.getId(), filmId);
        return ResponseEntity.noContent().build();
    }


    // Need a GET request to check if there is a watched entry for the film when the user loads a film card

    // Need a post request where if the user hasn't watched a film
    // they are able to click the button to add it to their watched film's should also return the watched film

    // Need a DELETE endpoint where if the user clicks a button that is showing watched it will remove the watched entry
    // This however should not be possible if the user has also reviewed the movie
}
