package com.example.demo.req;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyReq {

	@JsonProperty(value = "name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyReq() {
		super();
	}

	public CompanyReq(String name) {
		super();
		this.name = name;
	}

}