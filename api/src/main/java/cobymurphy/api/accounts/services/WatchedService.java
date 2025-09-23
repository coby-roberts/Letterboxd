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

    public List<WatchedEntry> findAllWatchedEntryByUserId(Long userId) {
        return watchedDao.findByUser_Id(userId);
    }

    public List<WatchedEntry> findAllWatchedEntryByUserUsername(String username) {
        return watchedDao.findByUser_Username(username);
    }

    public WatchedDto FindWatchedEntryByFilmId(Long id) {
        WatchedEntry watchedEntry = watchedDao.findByFilm_id(id)
                .orElseThrow(() -> new EntityNotFoundException("Film Id not found"));
        return watchedEntry.convertToDto();
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
}
