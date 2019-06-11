package com.example.demo.common;

public class Const {

	public static final long TOKEN_TIME = 24 * 60 * 60;

	public static final String SIGNING_KEY = "auth123key";

	public static final String TOKEN_PREFIX = "Bearer ";

	public static final String HEADER_STRING = "Authorization";

	public static final String PAYLOAD_NAME = "user";

	public static final String ROLE_ADMIN = "Admin";
	
	public static enum filterCustomer {
		Customer_Name,
		Phone,
		Address,
		Email,
		Company_Name,
		Date_of_birth
	}

}