package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.DiaryDto;
import cobymurphy.api.accounts.dto.FilmDto;
import cobymurphy.api.accounts.model.DiaryEntry;
import cobymurphy.api.accounts.model.Film;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.model.WatchedEntry;
import cobymurphy.api.accounts.repository.DiaryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {

    @Autowired
    DiaryDao diaryDao;

    public DiaryEntry addDiaryEntry(Users user, DiaryDto diaryDto, Film film) {

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

    public List<DiaryEntry> findAllDiaryEntryByUsername(String username) {
        return diaryDao.findByUser_Username(username);
    }

}
