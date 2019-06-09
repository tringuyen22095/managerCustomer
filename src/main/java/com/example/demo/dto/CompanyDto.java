package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyDto {

	@JsonProperty(value = "value")
	private int value;

	@JsonProperty(value = "name")
	private String name;

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyDto(int value, String name) {
		super();
		this.value = value;
		this.name = name;
	}

	public CompanyDto() {
		super();
	}

}