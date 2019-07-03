package com.example.demo.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bll.AccountFilterSetService;
import com.example.demo.bll.FilterSetService;
import com.example.demo.common.Utils;
import com.example.demo.dto.TokenDto;
import com.example.demo.model.Account;
import com.example.demo.model.AccountFilterSet;
import com.example.demo.model.FilterSet;
import com.example.demo.req.BaseReq;
import com.example.demo.req.FilterSetReq;
import com.example.demo.rsp.BaseRsp;
import com.example.demo.rsp.DataRsp;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/filter")
public class FilterSetContorller {

	@Autowired
	private AccountFilterSetService accountFilterSetService;

	@Autowired
	private FilterSetService filterSetService;

	@PostMapping("/search")
	public ResponseEntity<?> search(@RequestHeader HttpHeaders header, @RequestBody BaseReq req) {
		DataRsp res = new DataRsp();

		try {
			TokenDto token = Utils.getTokenInfor(header);
			List<AccountFilterSet> lAccountFilter;
			lAccountFilter = accountFilterSetService.findAllByAccUid(token.getUid(), req.getKeyword());
			int totalFilter = accountFilterSetService.findAllByAccUid(token.getUid(), "").size();

			Map<String, Object> data = new LinkedHashMap<>();
			data.put("data", lAccountFilter);
			data.put("count", totalFilter);

			res.setResult(data);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/findDefault")
	public ResponseEntity<?> findDefault(@RequestHeader HttpHeaders header) {
		DataRsp res = new DataRsp();

		try {
			TokenDto token = Utils.getTokenInfor(header);
			AccountFilterSet lAccountFilter = accountFilterSetService.findDefault(token.getUid());

			Map<String, Object> data = new LinkedHashMap<>();
			data.put("data", lAccountFilter);

			res.setResult(data);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/")
	public ResponseEntity<?> create(@RequestHeader HttpHeaders header, @RequestBody FilterSetReq req) {
		BaseRsp res = new BaseRsp();

		try {
			TokenDto token = Utils.getTokenInfor(header);
			ObjectMapper mapper = new ObjectMapper();
			FilterSet fs = mapper.convertValue(req, FilterSet.class);
			Account ac = mapper.convertValue(token, Account.class);

			fs = filterSetService.save(fs);

			AccountFilterSet m = new AccountFilterSet();
			m.setAcc(ac);
			m.setFilter(fs);

			accountFilterSetService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> remove(@RequestHeader HttpHeaders header, @PathVariable("id") int id) {
		BaseRsp res = new BaseRsp();

		try {
			accountFilterSetService.remove(id);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/{id}/{isDefault}")
	public ResponseEntity<?> edit(@RequestHeader HttpHeaders header, @RequestBody FilterSetReq req,
			@PathVariable("id") int id, @PathVariable("isDefault") boolean isDefault) {
		BaseRsp res = new BaseRsp();

		try {
			TokenDto token = Utils.getTokenInfor(header);
			ObjectMapper mapper = new ObjectMapper();
			FilterSet fs = mapper.convertValue(req, FilterSet.class);
			Account ac = mapper.convertValue(token, Account.class);

			AccountFilterSet m = new AccountFilterSet();
			m.setAcc(ac);
			m.setFilter(fs);
			m.setIsDefault(isDefault);
			m.setId(id);

			accountFilterSetService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

}