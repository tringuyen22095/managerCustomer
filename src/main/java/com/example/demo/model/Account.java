package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "account", schema = "public")
public class Account {

	@Id
	@Column(columnDefinition = "varchar(64)")
	private String uid;

	@Column(columnDefinition = "varchar(64)")
	private String pwd;

	@Column(columnDefinition = "varchar(255)")
	private String pwdHash;

	@Column(columnDefinition = "varchar(64)")
	private String name;

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

	public String getPwdHash() {
		return pwdHash;
	}

	public void setPwdHash(String pwdHash) {
		this.pwdHash = pwdHash;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Account() {
		super();
	}

	public Account(String uid, String pwd, String pwdHash, String name) {
		super();
		this.uid = uid;
		this.pwd = pwd;
		this.pwdHash = pwdHash;
		this.name = name;
	}

}