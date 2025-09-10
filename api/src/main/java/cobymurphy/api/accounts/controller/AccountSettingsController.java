package cobymurphy.api.accounts.controller;
import cobymurphy.api.accounts.dto.SettingsDto;
import cobymurphy.api.accounts.dto.UpdateUsernameDto;
import cobymurphy.api.accounts.exception.UsernameConflictException;
import cobymurphy.api.accounts.services.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/settings")
public class AccountSettingsController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<SettingsDto> settings(Principal principal) {

        String username = principal.getName();
        SettingsDto settingsDto = userService.settings(username);

        return ResponseEntity.ok(settingsDto);
    }

    @PatchMapping("/me")
    public ResponseEntity<SettingsDto> updateSettings(@RequestBody SettingsDto request, Principal principal) {
        String username = principal.getName();
        SettingsDto updated = userService.patchAccount(username, request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/me/username")
    public ResponseEntity<?> updateUsername(@RequestBody @Valid UpdateUsernameDto request, Principal principal) {
        String username = principal.getName();
        try {
            UpdateUsernameDto updated = userService.changeUsername(username, request.getUsername());
            return ResponseEntity.ok(updated);
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        } catch (UsernameConflictException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
        }
    }

//    TODO: add change password endpoint  |  add change email  ? maybe better in UserAuthController
}

