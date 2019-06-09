package com.example.demo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "company", schema = "public")
public class Company implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_id_seq_generator")
	@SequenceGenerator(name = "company_id_seq_generator", sequenceName = "public.company_id_seq", allocationSize = 1)
	@Column(columnDefinition = "SERIAL")
	private Integer id;

	@Column(columnDefinition = "varchar(64)")
	private String name;

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

	public Company(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Company() {
		super();
	}

}