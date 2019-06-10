package com.example.demo.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Company;

public interface CompanyDao extends CrudRepository<Company, Integer> {

}