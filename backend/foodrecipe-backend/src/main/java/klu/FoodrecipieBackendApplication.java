package klu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FoodrecipieBackendApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(FoodrecipieBackendApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(FoodrecipieBackendApplication.class, args);
		System.out.println("Enjoy the Delicious Food.....");
    }
}

