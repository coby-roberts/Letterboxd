package cobymurphy.api.accounts.controller;


import cobymurphy.api.accounts.dto.SettingsDto;
import cobymurphy.api.accounts.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/settings")
public class AccountSettingsController {

    @Autowired
    UserService service;

    @GetMapping
    public ResponseEntity<SettingsDto> settings(Principal principal) {

        String username = principal.getName();
        SettingsDto settingsDto = service.settings(username);

        return ResponseEntity.ok(settingsDto);
    }

}
