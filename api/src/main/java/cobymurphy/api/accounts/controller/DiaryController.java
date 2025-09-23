package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.*;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.services.DiaryService;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class DiaryController {

    @Autowired
    UserService userService;

    @Autowired
    DiaryService diaryService;

    @Autowired
    FilmService filmService;

    @Autowired
    WatchedService watchedService;

    // TODO : Use pagination
    @GetMapping("/{username}/diary")
    public ResponseEntity<List<DiaryFilmDto>> getUserDiary(@PathVariable String username) {

        List<DiaryFilmDto> diaryEntries = diaryService.findAllDiaryEntryByUsername(username).stream()
                .filter(entry -> entry.getFilm() != null)
                .map(entry -> new DiaryFilmDto(
                        entry.convertToDto(),
                        filmService.findFilmById(entry.getFilm().getId())
                ))
                .toList();

        return ResponseEntity.ok(diaryEntries);
    }

    @PostMapping("/{username}/diary")
    public ResponseEntity<DiaryDto> createDiaryEntry(@RequestBody DiaryFilmDto diaryFilmDto,
                                                     UriComponentsBuilder ucb,
                                                     Principal principal) {

        Users user = userService.findByUsername(principal.getName());
        Film film = filmService.findByIdOrCreate(diaryFilmDto.getFilmDto());
        watchedService.findAndUpdateOrCreate(user, film, diaryFilmDto.getDiaryDto().getRating());

        DiaryEntry entry = diaryService.addDiaryEntry(user, diaryFilmDto.getDiaryDto(), film);

        DiaryDto diaryDto = entry.convertToDto();

        URI location = ucb
                .path("users/{username}/diary")
                .buildAndExpand(principal.getName())
                .toUri();

        return ResponseEntity.created(location).body(diaryDto);
    }

    // TODO : implement userReview
    @GetMapping("/{username}/reviews")
    public String getUserReview(@PathVariable String username) {
        return "reviews.";
    }

}
