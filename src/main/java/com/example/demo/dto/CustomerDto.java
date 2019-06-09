package com.example.demo.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerDto {

	@JsonProperty(value = "id")
	private Integer id;

	@JsonProperty(value = "name")
	private String name;

	@JsonProperty(value = "address")
	private String address;

	@JsonProperty(value = "phone")
	private String phone;

	@JsonProperty(value = "email")
	private String email;

	@JsonProperty(value = "dob")
	private Date dob;

	@JsonProperty(value = "company")
	private Integer company;

	@JsonProperty(value = "companyName")
	private String companyName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Integer getCompany() {
		return company;
	}

	public void setCompany(Integer company) {
		this.company = company;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public CustomerDto(Integer id, String name, String address, String phone, String email, Date dob, Integer company,
			String companyName) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.dob = dob;
		this.company = company;
		this.companyName = companyName;
	}

	public CustomerDto() {
		super();
	}

}