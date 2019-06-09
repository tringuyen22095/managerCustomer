package com.example.demo.bll;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.model.Account;

public interface AccountService {

	public Account findById(String uid);

	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException;

	public List<SimpleGrantedAuthority> getAuthority(List<String> roles);

}