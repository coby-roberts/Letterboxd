package cobymurphy.api.accounts.repository;

import cobymurphy.api.accounts.model.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiaryDao extends JpaRepository<DiaryEntry, Long> {

    List<DiaryEntry> findByUser_Username(String username);

    Optional<DiaryEntry> findByUser_Id(Long id);

}
