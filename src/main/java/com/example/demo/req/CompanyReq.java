package com.example.demo.req;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyReq {

	@JsonProperty(value = "id")
	private String id;

	@JsonProperty(value = "name")
	private String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyReq() {
		super();
	}

	public CompanyReq(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

}