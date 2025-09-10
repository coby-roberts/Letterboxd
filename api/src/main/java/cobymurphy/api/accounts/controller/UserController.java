package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.*;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.services.UserService;
import cobymurphy.api.accounts.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FilmService filmService;

    @GetMapping("/{username}")
    public ResponseEntity<ProfileDto> profile(@PathVariable String username) {
        return ResponseEntity.ok(userService.getProfileByUsername(username));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProfileDto>> searchUsers(@RequestParam String searchQuery,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "username") String sortBy,
        @RequestParam(defaultValue = "ASC") String sortDirection) {

            Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<ProfileDto> users = userService.searchUsers(searchQuery, pageable);
            return ResponseEntity.ok(users);
    }

    /**
     * Returns a List of films watched by the user
     * @param username The username who's watched movies you want to receive
     * @return Returns a list of Films watched by the username
     */
    @GetMapping("/{username}/films")
    public ResponseEntity<List<WatchedEntry>> getWatchedFilms(@PathVariable String username) {
        return ResponseEntity.ok(userService.findAllWatchedEntryByUsername(username));
    }

    // TODO : implement userDiary
    @GetMapping("/{username}/diary")
    public ResponseEntity<List<DiaryEntry>> getUserDiary(@PathVariable String username) {
        return ResponseEntity.ok(userService.findAllDiaryEntryByUsername(username));
    }

    @PostMapping("/diary/{movieId}")
    public ResponseEntity<DiaryDto> createDiaryEntry(@PathVariable int movieId,
                                                       @RequestBody DiaryFilmDto diaryFilmDto,
                                                       UriComponentsBuilder ucb,
                                                       Principal principal) {

        String username = principal.getName();
        DiaryEntry entry = userService.addDiaryEntry(username, diaryFilmDto.getDiaryDto(), diaryFilmDto.getFilmDto());

        DiaryDto diaryDto = entry.convertToDto();

        URI location = ucb
                .path("users/diary/{movieId}")
                .buildAndExpand(movieId)
                .toUri();

        return ResponseEntity.created(location).body(diaryDto);
    }

    // TODO : implement userReview
    @GetMapping("/{username}/reviews")
    public String getUserReview(@PathVariable String username) {
        return "reviews.";
    }

    /**
     * Adds a watched entry to a users account
     *
     * @param movieId     MovieId of the film being added
     * @param WatchedFilmDto   A watchedDto and FilmDto
     * @param principal The authenticated user making the request
     * @param ucb       Used to construct the URI of the newly created watched entry
     * @return          A 201 created response with the location header to the new resource
     */
    @PostMapping("/watched/{movieId}")
    public ResponseEntity<WatchedDto> createWatchedEntry(@PathVariable int movieId,
                                                           @RequestBody WatchedFilmDto watchedFilmDto,
                                                           Principal principal,
                                                           UriComponentsBuilder ucb) {

        String username = principal.getName();
        WatchedEntry entry = userService.addWatchedEntry(username, watchedFilmDto.getFilm(), watchedFilmDto.getWatched());

        WatchedDto watchedDto = entry.convertToDto();

        URI location = ucb
                .path("users/film/{movieId}")
                .buildAndExpand(movieId)
                .toUri();

        return ResponseEntity.created(location).body(watchedDto);
    }
}


//    // FIXME: currently just retrieves the movie title,
//    /**
//     * If authenticated it shows watchedEntry details
//     * as well as the latest review of the {username},
//     * otherwise shows the latest review of the {username} if one exists
//     *
//     * @param username The username of the users review you want
//     * @param title Film title of the review you want
//     * @return FilmDTO
//     */
//    @GetMapping("/film/{title}")
//    public ResponseEntity<FilmDto> getLastFilmReview(@PathVariable String username, @PathVariable String title) {
//
//        return ResponseEntity.ok(filmService.findFilmByTitle(title));
//    }
