package com.example.demo.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bll.AccountService;
import com.example.demo.config.JwtTokenUtil;
import com.example.demo.model.Account;
import com.example.demo.req.LogInReq;
import com.example.demo.rsp.DataRsp;

@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LogInReq req) {
		DataRsp res = new DataRsp();

		try {
			String uid = req.getUid();
			String pwd = req.getPwd();

			Account m = accountService.getById(req.getUid());
			if (m == null) {
				res.setMessage("User name doesn't exist!");
			} else {
				UsernamePasswordAuthenticationToken x;
				x = new UsernamePasswordAuthenticationToken(uid, pwd);
				Authentication y = authenticationManager.authenticate(x);
				SecurityContextHolder.getContext().setAuthentication(y);

				Map<String, Object> data = new LinkedHashMap<>();

				List<String> roles = new ArrayList<String>();
				roles.add("Admin");
				List<SimpleGrantedAuthority> z = accountService.getAuthority(roles);
				String t1 = jwtTokenUtil.doGenerateToken(m, z);
				data.put("key", t1);

				res.setResult(data);
			}
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

}