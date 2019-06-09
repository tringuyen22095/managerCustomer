package com.example.demo.bll.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.CustomerService;
import com.example.demo.dao.CustomerDao;
import com.example.demo.dto.CustomerDto;
import com.example.demo.model.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service(value = "customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerDao;

	@PersistenceContext
	private EntityManager entityManager;

	public Customer getById(int id) {
		Customer res = customerDao.getBy(id);
		return res;
	}

	public List<CustomerDto> search(String keyword) throws Exception {
		List<Map<String, Object>> res = customerDao.search(keyword);

		List<CustomerDto> lData = new ArrayList<>();
		for (Object i : res) {
			ObjectMapper mapper = new ObjectMapper();
			CustomerDto item = mapper.convertValue(i, CustomerDto.class);

			lData.add(item);
		}

		return lData;
	}

	public List<CustomerDto> search(Date dFrom, Date dTo) {
		List<Map<String, Object>> res = customerDao.search(dFrom, dTo);

		List<CustomerDto> lData = new ArrayList<>();
		for (Object i : res) {
			ObjectMapper mapper = new ObjectMapper();
			CustomerDto item = mapper.convertValue(i, CustomerDto.class);

			lData.add(item);
		}

		return lData;
	}

	public String save(Customer m) {
		String res = "";

		Integer id = m.getId();

		Customer m1;
		if (id == null || id == 0) {
			m1 = customerDao.save(m);
		} else {
			m1 = customerDao.getBy(id);
			if (m1 == null) {
				res = "Id does not exist.";
			} else {
				customerDao.save(m);
			}
		}

		return res;
	}

	public String remove(int id) {
		String res = "";

		Customer m = customerDao.getBy(id);
		if (m != null) {
			customerDao.delete(m);
		} else {
			res = "Id does not exist.";
		}

		return res;
	}

	public String removes(Iterable<Integer> id) throws Exception {
		String res = "";

		Iterable<Customer> entities = customerDao.findAllById(id);
		customerDao.deleteAll(entities);

		return res;
	}

}