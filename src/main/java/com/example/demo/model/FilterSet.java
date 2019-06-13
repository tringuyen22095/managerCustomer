package com.example.demo.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "filter_set", schema = "public")
public class FilterSet implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "filter_set_id_seq_generator")
	@SequenceGenerator(name = "filter_set_id_seq_generator", sequenceName = "public.filter_set_id_seq", allocationSize = 1)
	@Column(columnDefinition = "SERIAL")
	private Integer id;

	@Column(columnDefinition = "varchar(256)")
	private String name;

	@Column(columnDefinition = "text")
	private String filter;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "filter", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<AccountFilterSet> accountFilterSets;

	@ManyToOne
	private Company company;

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

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public Set<AccountFilterSet> getAccountFilterSets() {
		return accountFilterSets;
	}

	public void setAccountFilterSets(Set<AccountFilterSet> accountFilterSets) {
		this.accountFilterSets = accountFilterSets;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public FilterSet() {
		super();
	}

	public FilterSet(Integer id, String name, String filter, Set<AccountFilterSet> accountFilterSets, Company company) {
		super();
		this.id = id;
		this.name = name;
		this.filter = filter;
		this.accountFilterSets = accountFilterSets;
		this.company = company;
	}

}