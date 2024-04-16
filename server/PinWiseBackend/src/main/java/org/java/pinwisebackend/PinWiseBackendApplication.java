package org.java.pinwisebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//exclude = {DataSourceAutoConfiguration.class}
@SpringBootApplication()
@EnableJpaRepositories("org.java.pinwisebackend.repositories")
public class PinWiseBackendApplication {


	public static void main(String[] args) {
		SpringApplication.run(PinWiseBackendApplication.class, args);
	}

}
