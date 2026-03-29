package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.FilmDto;
import cobymurphy.api.accounts.dto.WatchedDto;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.repository.WatchedDao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchedService {

    @Autowired
    WatchedDao watchedDao;

    @Autowired
    FilmService filmService;

    @Autowired
    UserService userService;

    public WatchedEntry createWatchedEntry(Users user, Film film, Integer rating) {
        WatchedEntry watchedEntry = new WatchedEntry(user, film, rating);
        return watchedDao.save(watchedEntry);
    }

    public void deleteWatchedEntry(Long userId, Long filmId) {
        int deletedCount = watchedDao.deleteByUser_IdAndFilm_Id(userId, filmId);
        if (deletedCount == 0) {
            throw new EntityNotFoundException(
                    "Watched Entry not found with userId: " + userId + ", filmId: " + filmId);
        }
    }

    public List<WatchedEntry> findAllWatchedEntryByUserId(Long userId) {
        return watchedDao.findByUser_Id(userId);
    }

    public List<WatchedEntry> findAllWatchedEntryByUserUsername(String username) {
        return watchedDao.findByUser_Username(username);
    }

    public WatchedEntry FindWatchedEntryByUserAndFilmId(Long userId, Long filmId) {
        return watchedDao.findByUser_UserIDAndFilm_FilmId(userId, filmId)
                .orElseThrow(() -> new EntityNotFoundException("Film Id not found"));
    }

    public WatchedEntry findAndUpdateOrCreate(Users user, Film film, Integer rating) {
        WatchedEntry watchedEntry = watchedDao.findByUserAndFilm(user, film)
                .map(entry -> {
                    entry.setRating(rating);
                    return entry;
                })
                .orElseGet(() -> new WatchedEntry(user, film, rating));
        return watchedDao.save(watchedEntry);
    }

    public WatchedEntry updateWatchedEntry(Users user, Film film, Integer rating) {
        WatchedEntry watchedEntry = watchedDao.findByUserAndFilm(user, film)
                .map(entry -> {
                    entry.setRating(rating);
                    return entry;
                })
                .orElseThrow(() -> new EntityNotFoundException("Watched Entry Not Found"));

        return watchedDao.save(watchedEntry);
    }

    public WatchedEntry updateWatchedEntry(Long userId, Long filmId, Integer rating) {
        WatchedEntry watchedEntry =  watchedDao.findByUser_UserIDAndFilm_FilmId(userId, filmId)
                .map(entry -> {
                    entry.setRating(rating);
                    return entry;
                })
                .orElseThrow(() -> new EntityNotFoundException("Watched Entry Not Found"));

        return watchedDao.save(watchedEntry);
    }

//    public WatchedEntry findAndUpdateOrCreate(Long userId, Long filmId, Integer rating) {
//        WatchedEntry watchedEntry = watchedDao.findByUser_UserIDAndFilm_FilmId(userId, filmId)
//                .map(entry -> {
//                    entry.setRating(rating);
//                    return entry;
//                })
//                .orElseGet(() -> {
//                      new WatchedEntry(userId, filmId, rating));
//                 }
//        return watchedDao.save(watchedEntry);
//    }
}
