package com.example.demo.req;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerReq {

	@JsonProperty(value = "name")
	private String name;

	@JsonProperty(value = "phone")
	private String phone;

	@JsonProperty(value = "address")
	private String address;

	@JsonProperty(value = "email")
	private String email;

	@JsonProperty(value = "dob")
	private Date dob;

	@JsonProperty(value = "company")
	private CompanyReq company;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public CompanyReq getCompany() {
		return company;
	}

	public void setCompany(CompanyReq company) {
		this.company = company;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public CustomerReq() {
		super();
	}

	public CustomerReq(String name, String phone, String address, String email, CompanyReq company, Date dob) {
		super();
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.email = email;
		this.company = company;
		this.dob = dob;
	}

}