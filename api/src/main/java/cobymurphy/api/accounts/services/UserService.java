package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.*;
import cobymurphy.api.accounts.exception.UsernameConflictException;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.repository.DiaryDao;
import cobymurphy.api.accounts.repository.WatchedDao;
import cobymurphy.api.accounts.dto.FilmDto;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.repository.FilmDao;
import cobymurphy.api.accounts.repository.UserDao;
import cobymurphy.api.accounts.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserDao userDao;
    private final FilmDao filmDao;
    private final WatchedDao watchedDao;
    private final DiaryDao diaryDao;

    public UserService(UserDao userDao,
                       FilmDao filmDao,
                       WatchedDao watchedRepository,
                       DiaryDao diaryDao,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {

        this.userDao = userDao;
        this.filmDao = filmDao;
        this.watchedDao = watchedRepository;
        this.diaryDao = diaryDao;
    }

    public SettingsDto settings(String username) {
        return userDao.findByUsername(username)
                .map(Users::convertToSettingsDTO)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public ProfileDto getProfileByUsername(String username) {
        return userDao.findByUsername(username)
                .map(Users::convertToProfileDTO)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // TODO: create a watchedDto to return instead of this.
    /**
     * @param username of the user whose films you want to retrieve
     * @return a list of the users watched films
     *
     */
    public List<WatchedEntry> findAllWatchedEntryByUsername(String username) {

        return watchedDao.findByUser_Username(username);
    }
    public List<WatchedEntry> findAllWatchedEntryByUsername(Long id) {
        return watchedDao.findByUser_Id(id);
    }

    // TODO: create a diaryDto to return instead of this.
    /**
     * @param username of the user whose films you want to retrieve
     * @return a list of the users watched films
     */
    public List<DiaryEntry> findAllDiaryEntryByUsername(String username) {
        return diaryDao.findByUser_Username(username);
    }

    public DiaryEntry addDiaryEntry(String username, DiaryDto diaryDto, FilmDto filmDto) {

        Users user = userDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        Film film = filmDao.findById(filmDto.getId())
                .orElseGet(() -> addFilm(filmDto));

        WatchedEntry watchedEntry = watchedDao.findByUserAndFilm(user, film)
                .orElse(new WatchedEntry(user, film, diaryDto.getRating()));
        watchedEntry.setRating(diaryDto.getRating());
        watchedDao.save(watchedEntry);

        DiaryEntry diaryEntry = new DiaryEntry();
        diaryEntry.setUser(user);
        diaryEntry.setFilm(film);
        diaryEntry.setWatchDate(diaryDto.getWatchDate());

        if (diaryDto.getReview() != null) {
            diaryEntry.setReview(diaryDto.getReview());
        }
        if (diaryDto.getRating() > 0) {
            diaryEntry.setRating(diaryDto.getRating());
        }

        return diaryDao.save(diaryEntry);
    }

    /**
     * Adds a film to a users watched list
     *
     * @param username The authenticated user making the request
     * @param filmDto   DTO containing details of the film and user rating
     */
    public WatchedEntry updateWatchedEntry(String username, FilmDto filmDto, WatchedDto watchedDto) {

        Users user = userDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        Film film = filmDao.findById(filmDto.getId())
                    .orElseGet(() -> addFilm(filmDto));

        WatchedEntry entry = new WatchedEntry(user, film, watchedDto.getRating());

        return watchedDao.save(entry);
    }

    public Film addFilm(FilmDto filmDto) {
        Film film = filmDto.convertToFIlm();
        return filmDao.save(film);
    }

    public SettingsDto patchAccount(String username, SettingsDto request) {
       
        Users user = userDao.findByUsername(username)
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
        Users saved = userDao.save(user);

        return saved.convertToSettingsDTO();
    }

    public UpdateUsernameDto changeUsername(String username, String newUsername) {

        if (userDao.existsByUsername(newUsername)) {
            throw new UsernameConflictException("Username " + newUsername + " already taken.");
        }

        Users user = userDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username Not Found: " + newUsername));

        user.setUsername(newUsername);
        Users saved = userDao.save(user);

        return new UpdateUsernameDto(newUsername);
    }

    public Page<ProfileDto> searchUsers(String searchQuery, Pageable pageable) {
        if (searchQuery == null || searchQuery.trim().isEmpty()) {
            return Page.empty(pageable);
        }

        Page<Users> users = userDao.findByUsernameContainingIgnoreCase(searchQuery.trim(), pageable);
        return users.map(Users::convertToProfileDTO);
    }

    public Users followUser(String followerUsername, String followedUsername) {
        Users follower = userDao.findByUsername(followerUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Follower not found"));

        Users followed = userDao.findByUsername(followedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Followed not found"));

        if (follower.getFollowing().contains(followed)) {
            throw new IllegalStateException("Already Following");
        }

        follower.getFollowing().add(followed);

        return userDao.save(follower);
    }

    public Users unfollowUser(String followerUsername, String unfollowedUsername) {
        Users follower = userDao.findByUsername(followerUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Follower not found"));

        Users unfollowed = userDao.findByUsername(unfollowedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Followed not found"));

        if (!follower.getFollowing().contains(unfollowed)) {
            throw new IllegalStateException("Already Unfollowed");
        }

        follower.getFollowing().remove(unfollowed);

        return userDao.save(follower);
    }
}
