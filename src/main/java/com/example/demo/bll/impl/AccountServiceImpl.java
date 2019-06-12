package com.example.demo.bll.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.AccountService;
import com.example.demo.dao.AccountDao;
import com.example.demo.model.Account;

@Service(value = "accountService")
@Transactional
public class AccountServiceImpl implements UserDetailsService, AccountService {

	@Autowired
	private AccountDao accountDao;

	public Account findById(String uid) {
		return accountDao.findById(uid).orElse(null);
	}

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		Account a = findById(uid);

		if (a == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}

		List<String> roles = new ArrayList<>();
		roles.add("Admin");
		String hash = a.getPwdHash();

		return new User(uid, hash, getAuthority(roles));
	}

	public List<SimpleGrantedAuthority> getAuthority(List<String> roles) {
		return roles.stream().map(r -> new SimpleGrantedAuthority(r)).collect(Collectors.toList());
	}

}