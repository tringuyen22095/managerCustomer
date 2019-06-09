package com.example.demo.bll;

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

import com.example.demo.dao.AccountDao;
import com.example.demo.model.Account;

@Service(value = "accountService")
@Transactional
public class AccountService implements UserDetailsService {

	@Autowired
	private AccountDao accountDao;

	/**
	 * Check login
	 * 
	 * @param uid username
	 * @param pwd password
	 * @return
	 */
	public Account getById(String uid) {
		Account res = accountDao.getById(uid);

		return res;
	}

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		Account a = getById(uid);

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