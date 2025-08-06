package cobymurphy.api.accounts.dto;

import jakarta.validation.constraints.*;

public class RegisterDto {

    @Size(min=1, max=26)
    @NotBlank
    private String username;


    @NotBlank
    private String password;
    @Email
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}