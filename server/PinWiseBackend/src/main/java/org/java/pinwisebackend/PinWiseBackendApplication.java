package org.java.pinwisebackend;

import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class PinWiseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PinWiseBackendApplication.class, args);
	}

}
