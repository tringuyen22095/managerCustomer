package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Customer;

public interface CustomerDao extends CrudRepository<Customer, Integer> {

	@Query(nativeQuery = true, value = "SELECT * FROM customer a ORDER BY a.id ASC OFFSET :from LIMIT :get")
	public List<Customer> getLimit(@Param("from") int from, @Param("get") int get);

}