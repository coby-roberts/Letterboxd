package cobymurphy.api.accounts.services;

import cobymurphy.api.accounts.repository.UserRepository;
import cobymurphy.api.accounts.model.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new CustomUserDetails(repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username)));
    }
}
