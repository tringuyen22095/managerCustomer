package com.example.demo.rsp;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DataRsp extends BaseRsp {

	@JsonProperty(value = "result")
	private Map<String, Object> result;

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public DataRsp() {
		super();
	}

}