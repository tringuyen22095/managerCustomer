package com.example.demo.common;

import org.springframework.http.HttpHeaders;

import com.example.demo.dto.TokenDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

public class Utils {

	/**
	 * Decode JWT
	 * 
	 * @param header HttpHeader
	 * @return
	 */
	public static TokenDto getTokenInfor(HttpHeaders header) {
		String token = header.get(Const.HEADER_STRING).get(0);
		token = token.replace(Const.TOKEN_PREFIX, "");

		JwtParser x = Jwts.parser().setSigningKey(Const.SIGNING_KEY);
		Claims y = x.parseClaimsJws(token).getBody();
		Object z = y.get("user");

		ObjectMapper mapper = new ObjectMapper();
		TokenDto res = mapper.convertValue(z, TokenDto.class);
		return res;
	}

}