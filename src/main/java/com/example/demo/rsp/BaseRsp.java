package com.example.demo.rsp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BaseRsp {

	@JsonProperty(value = "status")
	private String status;

	@JsonProperty(value = "message")
	private String message;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
		this.setStatus("Fail");
	}

	public BaseRsp() {
		super();
		this.status = "Success";
		this.message = "";
	}

}