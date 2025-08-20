package cobymurphy.api.accounts.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateUsernameRequest {
    @NotBlank
    private String username;

    // Getter and Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
