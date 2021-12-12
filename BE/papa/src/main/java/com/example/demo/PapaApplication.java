package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@SpringBootApplication(scanBasePackages = {"com.example.demo"})
@EnableCaching
@EnableWebMvc
public class PapaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PapaApplication.class, args);
	}
}
