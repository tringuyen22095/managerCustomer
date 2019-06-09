package com.example.demo.req;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeleteReq {

	@JsonProperty(value = "ids")
	private Iterable<Integer> ids;

	public Iterable<Integer> getIds() {
		return ids;
	}

	public void setIds(Iterable<Integer> ids) {
		this.ids = ids;
	}

	public DeleteReq(Iterable<Integer> ids) {
		super();
		this.ids = ids;
	}

	public DeleteReq() {
		super();
	}

}