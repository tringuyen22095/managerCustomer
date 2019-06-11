package com.example.demo.req;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BaseReq {

	@JsonProperty(value = "keyword")
	private String keyword;

	@JsonProperty(value = "dFrom")
	private Date dFrom;

	@JsonProperty(value = "dTo")
	private Date dTo;

	@JsonProperty(value = "show")
	private Integer show;

	@JsonProperty(value = "page")
	private Integer page;
	
	@JsonProperty(value = "filter")
	private List<String> filter;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Date getdFrom() {
		return dFrom;
	}

	public void setdFrom(Date dFrom) {
		this.dFrom = dFrom;
	}

	public Date getdTo() {
		return dTo;
	}

	public void setdTo(Date dTo) {
		this.dTo = dTo;
	}

	public Integer getShow() {
		return show;
	}

	public void setShow(Integer show) {
		this.show = show;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public List<String> getFilter() {
		return filter;
	}

	public void setFilter(List<String> filter) {
		this.filter = filter;
	}

	public BaseReq(String keyword, Date dFrom, Date dTo, Integer show, Integer page, List<String> filter) {
		super();
		this.keyword = keyword;
		this.dFrom = dFrom;
		this.dTo = dTo;
		this.show = show;
		this.page = page;
		this.filter = filter;
	}

	public BaseReq() {
		super();
	}

}