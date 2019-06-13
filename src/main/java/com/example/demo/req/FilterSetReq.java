package com.example.demo.req;

import com.example.demo.model.Company;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FilterSetReq {

	@JsonProperty(value = "id")
	private String id;

	@JsonProperty(value = "name")
	private String name;

	@JsonProperty(value = "filter")
	private String filter;
	
	@JsonProperty(value = "company")
	private Company company;

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

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public FilterSetReq(String id, String name, String filter, Company company) {
		super();
		this.id = id;
		this.name = name;
		this.filter = filter;
		this.company = company;
	}

	public FilterSetReq() {
		super();
	}

}