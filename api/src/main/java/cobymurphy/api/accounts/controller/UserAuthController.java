package cobymurphy.api.accounts.controller;

import cobymurphy.api.accounts.dto.LoginDto;
import cobymurphy.api.accounts.dto.RegisterDto;
import cobymurphy.api.accounts.services.UserAuthService;
import cobymurphy.api.accounts.response.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController

@RequestMapping("/account")
public class UserAuthController {

    @Autowired
    private UserAuthService service;

    @PostMapping(value = "/login", consumes ="application/json")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDto user) {
        return ResponseEntity.ok(service.verify(user));
    }

    @PostMapping(value = "/signup", consumes ="application/json")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterDto registerDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(registerDto));
    }

    @GetMapping("/whoami")
    public String whoAmI(Principal principal) {
        return "Hello, your principal name is: " + principal.getName();
    }
}
