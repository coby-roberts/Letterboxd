package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.DiaryDto;
import cobymurphy.api.accounts.dto.ProfileDto;
import cobymurphy.api.accounts.exception.UsernameConflictException;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.repository.DiaryRepository;
import cobymurphy.api.accounts.repository.WatchedRepository;
import cobymurphy.api.accounts.response.UpdatedUsernameResponse;
import cobymurphy.api.film.dto.FilmDto;
import cobymurphy.api.accounts.dto.SettingsDto;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.film.repository.FilmRepository;
import cobymurphy.api.accounts.repository.UserRepository;
import cobymurphy.api.film.model.Film;
import cobymurphy.api.jwt.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final FilmRepository filmRepository;
    private final WatchedRepository watchedRepository;
    private final DiaryRepository diaryRepository;

    public UserService(UserRepository userRepository,
                       FilmRepository filmRepository,
                       WatchedRepository watchedRepository,
                       DiaryRepository diaryRepository,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.filmRepository = filmRepository;
        this.watchedRepository = watchedRepository;
        this.diaryRepository = diaryRepository;
    }

    public SettingsDto settings(String username) {
        return userRepository.findByUsername(username)
                .map(Users::convertToSettingsDTO)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public ProfileDto getProfileByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(Users::convertToProfileDTO)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // TODO: create a watchedDto to return instead of this.
    /**
     * @param username of the user whose films you want to retrieve
     * @return a list of the users watched films
     */
    public List<WatchedEntry> findAllWatchedEntryByUsername(String username) {
        return watchedRepository.findByUser_Username(username);
    }

    // TODO: create a diaryDto to return instead of this.
    /**
     * @param username of the user whose films you want to retrieve
     * @return a list of the users watched films
     */
    public List<DiaryEntry> findAllDiaryEntryByUsername(String username) {
        return diaryRepository.findByUser_Username(username);
    }

    public DiaryEntry addDiaryEntry(String username, DiaryDto diaryDto, FilmDto filmDto) {

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        Film film = getOrCreateFilm(filmDto);

        DiaryEntry entry = new DiaryEntry();
        entry.setUser(user);
        entry.setFilm(film);
        entry.setWatchDate(diaryDto.getWatchDate());

        if (diaryDto.getReview() != null) {
            entry.setReview(diaryDto.getReview());
        }
        if (diaryDto.getRating() > 0) {
            entry.setRating(diaryDto.getRating());
        }

        return entry;
    }

    /**
     * Adds a film to a users watched list
     *
     * @param username The authenticated user making the request
     * @param filmDto   DTO containing details of the film and user rating
     */
    public WatchedEntry addWatchedEntry(String username, FilmDto filmDto) {

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        Film film = getOrCreateFilm(filmDto);

        WatchedEntry entry = new WatchedEntry(user, film, filmDto.getUser_rating());
        watchedRepository.save(entry);

        return entry;
    }

    public void addFilmIfDoesNotExist(Film film) {
        if (filmRepository.existsById(film.getId())) {
            return;
        }
        filmRepository.save(film);
    }

    private Film getOrCreateFilm(FilmDto filmDto) {
        Film film = filmDto.convertToFIlm();
        addFilmIfDoesNotExist(film);
        return film;
    }

    public SettingsDto patchAccount(String username, SettingsDto request) {
       
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (request.getBio() != null && !request.getBio().equals(user.getBio())) {
            user.setBio(request.getBio());
        }
        if (request.getFamilyName() != null && !request.getFamilyName().equals(user.getFamilyName())) {
            user.setFamilyName(request.getFamilyName());
        }
        if (request.getGivenName() != null && !request.getGivenName().equals(user.getGivenName())) {
            user.setGivenName(request.getGivenName());
        }
        Users saved = userRepository.save(user); 

        return saved.convertToSettingsDTO();
    }

    public UpdatedUsernameResponse changeUsername(String username, String newUsername) {

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + newUsername + " already taken."));

        if (userRepository.existsByUsername(newUsername)) {
            throw new UsernameConflictException("Username " + newUsername + " already taken.");
        }

        user.setUsername(newUsername);
        Users saved = userRepository.save(user);

        return new UpdatedUsernameResponse(newUsername);
    }

}
