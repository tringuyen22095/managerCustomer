package com.example.demo.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "account", schema = "public")
public class Account implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(columnDefinition = "varchar(64)")
	private String uid;

	@Column(columnDefinition = "varchar(64)")
	private String pwd;

	@Column(columnDefinition = "varchar(256)")
	private String pwdHash;

	@Column(columnDefinition = "varchar(64)")
	private String name;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "acc", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<AccountFilterSet> accountFilterSets;

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

	public Set<AccountFilterSet> getAccountFilterSets() {
		return accountFilterSets;
	}

	public void setAccountFilterSets(Set<AccountFilterSet> accountFilterSets) {
		this.accountFilterSets = accountFilterSets;
	}

	public Account() {
		super();
	}

	public Account(String uid, String pwd, String pwdHash, String name, Set<AccountFilterSet> accountFilterSets) {
		super();
		this.uid = uid;
		this.pwd = pwd;
		this.pwdHash = pwdHash;
		this.name = name;
		this.accountFilterSets = accountFilterSets;
	}

}