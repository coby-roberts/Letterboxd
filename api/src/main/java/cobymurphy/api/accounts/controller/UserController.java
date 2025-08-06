package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.DiaryDto;
import cobymurphy.api.accounts.dto.ProfileDto;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.services.UserService;
import cobymurphy.api.film.dto.FilmDto;
import cobymurphy.api.film.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/{username}")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FilmService filmService;

    @GetMapping
    public ResponseEntity<ProfileDto> profile(@PathVariable String username) {
        return ResponseEntity.ok(userService.getProfileByUsername(username));
    }

    /**
     * Returns a List of films watched by the user
     * @param username The username who's watched movies you want to receive
     * @return Returns a list of Films watched by the username
     */
    @GetMapping("/films")
    public ResponseEntity<List<WatchedEntry>> createWatchedEntry(@PathVariable String username) {
        return ResponseEntity.ok(userService.findAllWatchedEntryByUsername(username));
    }

    // TODO : implement userDiary
    @GetMapping("/films/diary")
    public ResponseEntity<List<DiaryEntry>> userDiary(@PathVariable String username) {
        return ResponseEntity.ok(userService.findAllDiaryEntryByUsername(username));
    }

    @PostMapping("/films/diary/{title}")
    public ResponseEntity<DiaryEntry> createDiaryEntry(@PathVariable String title,
                                                       @RequestBody DiaryDto diaryDto,
                                                       @RequestBody FilmDto filmDto,
                                                       UriComponentsBuilder ucb,
                                                       Principal principal) {

        String principalName = principal.getName();
        DiaryEntry entry = userService.addDiaryEntry(principalName, diaryDto, filmDto);

        URI location = ucb
                .path("{username}/films/diary/{title}")
                .buildAndExpand(principalName, title)
                .toUri();

        return ResponseEntity.created(location).body(entry);
    }

    // TODO : implement userReview
    @GetMapping("/films/reviews")
    public String userReview(@PathVariable String username) {
        return "reviews.";
    }

    /**
     * If authenticated it shows watchedEntry details
     * as well as the latest review of the {username},
     * otherwise shows the latest review of the {username} if one exists
     *
     * @param username The username of the users review you want
     * @param title Film title of the review you want
     * @return
     */
    @GetMapping("/film/{title}")
    public ResponseEntity<FilmDto> getLastFilmReview(@PathVariable String username, @PathVariable String title) {

        return ResponseEntity.ok(filmService.findFilmByTitle(title));
    }

    /**
     * Adds a watched entry to a users account
     *
     * @param title     Title of the film being added
     * @param filmDto   Relating to the passed title
     * @param principal The authenticated user making the request
     * @param ucb       Used to construct the URI of the newly created watched entry
     * @return A 201 created response with the location header to the new resource
     */
    @PostMapping("/film/{title}")
    public ResponseEntity<WatchedEntry> createWatchedEntry(@PathVariable String title,
                                                           @RequestBody FilmDto filmDto,
                                                           Principal principal,
                                                           UriComponentsBuilder ucb) {

        String principalName = principal.getName();
        WatchedEntry entry = userService.addWatchedEntry(principalName, filmDto);

        URI location = ucb
                .path("{username}/film/{title}")
                .buildAndExpand(principalName, title)
                .toUri();

        return ResponseEntity.created(location).body(entry);
    }
}
