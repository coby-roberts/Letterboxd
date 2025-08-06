package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.dto.LoginDto;
import cobymurphy.api.accounts.dto.RegisterDto;
import cobymurphy.api.accounts.model.Users;
import cobymurphy.api.accounts.repository.UserRepository;
import cobymurphy.api.accounts.response.AuthResponse;
import cobymurphy.api.jwt.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public UserAuthService(UserRepository repository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public AuthResponse register(RegisterDto registerDto) {

        Users user = new Users(registerDto.getUsername(), registerDto.getPassword(), registerDto.getEmail());

        if (repository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username taken, contact Liam Neeson");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);

        return new AuthResponse(user.getUsername(), jwtService.generateToken(user.getUsername()));
    }

    public AuthResponse verify(LoginDto loginDto) {

//        Users user = repository.findByUsername(loginDto.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + loginDto.getUsername()));

        Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        if (authentication.isAuthenticated()) {
            return new AuthResponse(loginDto.getUsername(), jwtService.generateToken(loginDto.getUsername()));
        } else {
            throw new IllegalArgumentException("Unable to verify");
        }
    }
}
