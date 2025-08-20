package cobymurphy.api.accounts.response;

import jakarta.validation.constraints.NotBlank;

public class UpdatedUsernameResponse {

    private String username;

    public UpdatedUsernameResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
