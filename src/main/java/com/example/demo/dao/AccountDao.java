package com.example.demo.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Account;

public interface AccountDao extends CrudRepository<Account, String> {

}