package com.example.demo.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bll.CustomerService;
import com.example.demo.model.Customer;
import com.example.demo.req.BaseReq;
import com.example.demo.req.CustomerReq;
import com.example.demo.req.DeleteReq;
import com.example.demo.rsp.BaseRsp;
import com.example.demo.rsp.DataRsp;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@RequestHeader HttpHeaders header, @PathVariable("id") int id) {
		DataRsp res = new DataRsp();

		try {
			Customer cus = customerService.findById(id);

			Map<String, Object> data = new LinkedHashMap<>();
			data.put("data", cus);

			res.setResult(data);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/search")
	public ResponseEntity<?> search(@RequestHeader HttpHeaders header, @RequestBody BaseReq req) {
		DataRsp res = new DataRsp();

		try {
			List<Customer> lCus = customerService.search(req);

			Map<String, Object> data = new LinkedHashMap<>();
			int totalPage = lCus.size() / req.getShow();
			totalPage += lCus.size() % req.getShow() != 0 ? 1 : 0;
			data.put("page", totalPage == 0 ? 1
					: totalPage < req.getPage() ? totalPage : (req.getPage() == 0 ? 1 : req.getPage()));
			data.put("totalRecord", lCus.size());
			data.put("data", lCus.stream().skip((Integer.parseInt(data.get("page").toString()) - 1) * req.getShow())
					.limit(req.getShow()));

			res.setResult(data);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/")
	public ResponseEntity<?> create(@RequestHeader HttpHeaders header, @RequestBody CustomerReq req) {
		BaseRsp res = new BaseRsp();

		try {
			ObjectMapper mapper = new ObjectMapper();
			Customer m = mapper.convertValue(req, Customer.class);

			customerService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestHeader HttpHeaders header, @RequestBody CustomerReq req,
			@PathVariable("id") int id) {
		BaseRsp res = new BaseRsp();

		try {
			ObjectMapper mapper = new ObjectMapper();
			Customer m = mapper.convertValue(req, Customer.class);
			m.setId(id);

			customerService.save(m);
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> remove(@RequestHeader HttpHeaders header, @PathVariable("id") int id) {
		BaseRsp res = new BaseRsp();

		try {
			String rsp = customerService.remove(id);
			if (!rsp.isEmpty()) {
				res.setMessage(rsp);
			}
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("/")
	public ResponseEntity<?> removes(@RequestHeader HttpHeaders header, @RequestBody DeleteReq req) {
		BaseRsp res = new BaseRsp();

		try {
			String rsp = customerService.removes(req.getIds());
			if (!rsp.isEmpty()) {
				res.setMessage(rsp);
			}
		} catch (Exception ex) {
			res.setMessage(ex.getMessage());
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

}