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

import com.example.demo.bll.CompanyService;
import com.example.demo.dto.CompanyDto;
import com.example.demo.model.Company;
import com.example.demo.req.BaseReq;
import com.example.demo.req.CompanyReq;
import com.example.demo.rsp.BaseRsp;
import com.example.demo.rsp.DataRsp;

@RestController
@RequestMapping("/company")
public class CompanyContorller {

	@Autowired
	private CompanyService companyService;

	@PostMapping("/search")
	public ResponseEntity<?> search(@RequestHeader HttpHeaders header, @RequestBody BaseReq req) {
		DataRsp res = new DataRsp();

		try {
			List<CompanyDto> lComp = companyService.search(req.getKeyword());

			Map<String, Object> data = new LinkedHashMap<>();
			data.put("data", lComp);

			res.setResult(data);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/")
	public ResponseEntity<?> create(@RequestHeader HttpHeaders header, @RequestBody CompanyReq req) {
		BaseRsp res = new BaseRsp();

		try {
			Company m = new Company();

			m.setName(req.getName());

			companyService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestHeader HttpHeaders header, @RequestBody CompanyReq req,
			@PathVariable("id") int id) {
		BaseRsp res = new BaseRsp();

		try {
			Company m = companyService.getById(id);

			m.setName(req.getName());

			companyService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> remove(@RequestHeader HttpHeaders header, @PathVariable("id") int id) {
		BaseRsp res = new BaseRsp();

		try {
			String rsp = companyService.remove(id);
			if (!rsp.isEmpty()) {
				res.setMessage(rsp);
			}
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

}