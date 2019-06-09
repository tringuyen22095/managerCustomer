package com.example.demo.req;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeleteReq {

	@JsonProperty(value = "ids")
	private List<Object> ids;

	public List<Object> getIds() {
		return ids;
	}

	public void setIds(List<Object> ids) {
		this.ids = ids;
	}

	public DeleteReq(List<Object> ids) {
		super();
		this.ids = ids;
	}

	public DeleteReq() {
		super();
	}

}