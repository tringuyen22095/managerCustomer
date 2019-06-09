package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@ComponentScan(basePackages = "com.example.demo")
public class ManageCustomerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ManageCustomerApplication.class, args);
	}

}