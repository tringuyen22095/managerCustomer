package com.example.demo.req;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FilterSetReq {

	@JsonProperty(value = "id")
	private String id;

	@JsonProperty(value = "name")
	private String name;

	@JsonProperty(value = "filter")
	private String filter;

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

	public FilterSetReq(String id, String name, String filter) {
		super();
		this.id = id;
		this.name = name;
		this.filter = filter;
	}

	public FilterSetReq() {
		super();
	}

}