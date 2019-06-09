package com.example.demo.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Customer;

public interface CustomerDao extends CrudRepository<Customer, Integer> {

	@Query("FROM Customer a WHERE a.id = :id")
	public Customer getBy(@Param("id") int id);

	@Query(nativeQuery = true, value = "SELECT a.*, b.name \"companyName\" FROM customer a JOIN company b ON a.company = b.id WHERE UPPER(a.name) LIKE UPPER(CONCAT('%', :keyword, '%')) OR UPPER(a.phone) LIKE UPPER(CONCAT('%', :keyword, '%')) OR UPPER(a.address) LIKE UPPER(CONCAT('%', :keyword, '%')) ORDER BY a.id ASC")
	public List<Map<String, Object>> search(@Param("keyword") String keyword);

	@Query(nativeQuery = true, value = "SELECT a.*, b.name \"companyName\" FROM customer a JOIN company b ON a.company = b.id WHERE a.dob >= :dFrom AND a.dob <= :dTo ORDER BY a.id ASC")
	public List<Map<String, Object>> search(@Param("dFrom") Date dFrom, @Param("dTo") Date dTo);

}