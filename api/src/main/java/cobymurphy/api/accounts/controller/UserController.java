package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.*;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.services.UserService;
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

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<ProfileDto> profile(@PathVariable String username) {
        return ResponseEntity.ok(userService.getProfileByUsername(username));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProfileDto>> searchUsers(
            @RequestParam String searchQuery,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "username") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {

            Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<ProfileDto> users = userService.searchUsers(searchQuery, pageable);
            return ResponseEntity.ok(users);
    }

    @PostMapping("/{username}/follow")
    public ResponseEntity<ProfileDto> followUser(@PathVariable String username, Principal principal, UriComponentsBuilder ucb) {

        Users followedUser = userService.followUser(principal.getName(), username);
        ProfileDto followedUserDto = followedUser.convertToProfileDTO();

        URI location = ucb
                .path("users/{username}/follow")
                .buildAndExpand(username)
                .toUri();

        return ResponseEntity.created(location).body(followedUserDto);
    }
    @PostMapping("/{username}/unfollow")
    public ResponseEntity<ProfileDto> unfollowUser(@PathVariable String username, Principal principal, UriComponentsBuilder ucb) {

        Users unfollowedUser = userService.unfollowUser(principal.getName(), username);
        ProfileDto unfollowedUserDto = unfollowedUser.convertToProfileDTO();

        URI location = ucb
                .path("users/{username}/unfollow")
                .buildAndExpand(username)
                .toUri();

        return ResponseEntity.created(location).body(unfollowedUserDto);
    }
}