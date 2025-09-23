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
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public Users findByUsername(String username) {
        return userDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
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
