package com.example.demo.req;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LogInReq {

	@JsonProperty(value = "uid")
	private String uid;

	@JsonProperty(value = "pwd")
	private String pwd;

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public LogInReq(String uid, String pwd) {
		super();
		this.uid = uid;
		this.pwd = pwd;
	}

	public LogInReq() {
		super();
	}

}