package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.LoginDto;
import cobymurphy.api.accounts.dto.RegisterDto;
import cobymurphy.api.accounts.services.UserAuthService;
import cobymurphy.api.accounts.dto.AuthDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import java.util.Optional;


@RestController

@RequestMapping("/account")
public class UserAuthController {

    @Autowired
    private UserAuthService service;

    @PostMapping(value = "/login", consumes ="application/json")
    public ResponseEntity<AuthDto> login(@RequestBody LoginDto user) {
        return ResponseEntity.ok(service.verify(user));
    }

    @PostMapping(value = "/signup", consumes ="application/json")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        Optional<AuthDto> response = service.register(registerDto);
        if (response.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
