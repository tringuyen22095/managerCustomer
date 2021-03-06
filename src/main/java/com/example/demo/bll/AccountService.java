package com.example.demo.bll;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.model.Account;

public interface AccountService {

	/**
	 * Get account by Id
	 * 
	 * @param uid uid is unique in table
	 * @return
	 */
	public Account findById(String uid);

	/**
	 * Login through JWT
	 * 
	 * @param uid
	 * @return
	 * @throws UsernameNotFoundException
	 */
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException;

	/**
	 * Get role through JWT
	 * 
	 * @param roles
	 * @return
	 */
	public List<SimpleGrantedAuthority> getAuthority(List<String> roles);

}