package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenDto {

	@JsonProperty(value = "uid")
	private String uid;

	@JsonProperty(value = "name")
	private String name;

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TokenDto(String uid, String name) {
		super();
		this.uid = uid;
		this.name = name;
	}

	public TokenDto() {
		super();
	}

}