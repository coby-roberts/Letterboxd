package cobymurphy.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.domain.EntityScan;



@SpringBootApplication
@EntityScan(basePackages = {
		"cobymurphy.api.accounts.model",         // existing packages
		"cobymurphy.api.film"  // add the package where Film is
})
public class LetterboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(LetterboxApplication.class, args);
	}

}
