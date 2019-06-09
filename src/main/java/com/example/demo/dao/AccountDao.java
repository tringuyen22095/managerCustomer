package com.example.demo.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Account;

public interface AccountDao extends CrudRepository<Account, String> {

	/**
	 * Login by uid & pwd
	 * 
	 * @param uid username
	 * @param pwd password
	 * @return
	 */
	@Query("FROM Account a WHERE a.uid = :uid")
	public Account getById(@Param("uid") String uid);

}