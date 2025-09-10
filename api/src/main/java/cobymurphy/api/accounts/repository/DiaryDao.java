package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryDao extends JpaRepository<DiaryEntry, Long> {

    List<DiaryEntry> findByUser_Username(String username);

}
