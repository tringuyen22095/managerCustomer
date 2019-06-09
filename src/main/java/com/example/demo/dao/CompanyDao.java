package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Company;

public interface CompanyDao extends CrudRepository<Company, Integer> {

	@Query("FROM Company a WHERE a.id = :id")
	public Company getBy(@Param("id") int id);

	@Query(nativeQuery = true, value = "SELECT * FROM company a WHERE UPPER(a.name) LIKE UPPER(CONCAT('%', :keyword, '%')) ORDER BY a.id ASC")
	public List<Company> search(@Param("keyword") String keyword);

}