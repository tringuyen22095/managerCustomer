package com.example.demo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "account_filter_set", schema = "public")
public class AccountFilterSet implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_id_seq_generator")
	@SequenceGenerator(name = "company_id_seq_generator", sequenceName = "public.company_id_seq", allocationSize = 1)
	@Column(columnDefinition = "SERIAL")
	private Integer id;

	@ManyToOne
	private Account acc;

	@ManyToOne
	private FilterSet filter;

	@Column(columnDefinition = "bool", nullable = true)
	private Boolean isDefault;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Account getAcc() {
		return acc;
	}

	public void setAcc(Account acc) {
		this.acc = acc;
	}

	public FilterSet getFilter() {
		return filter;
	}

	public void setFilter(FilterSet filter) {
		this.filter = filter;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public AccountFilterSet(Integer id, Account acc, FilterSet filter, Boolean isDefault) {
		super();
		this.id = id;
		this.acc = acc;
		this.filter = filter;
		this.isDefault = isDefault;
	}

	public AccountFilterSet() {
		super();
	}

}