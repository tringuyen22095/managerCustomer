package com.example.demo.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Customer;

public interface CustomerDao extends CrudRepository<Customer, Integer> {

}