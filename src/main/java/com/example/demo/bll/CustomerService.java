package com.example.demo.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dao.CustomerDao;
import com.example.demo.dto.CustomerDto;
import com.example.demo.model.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service(value = "customerService")
@Transactional
public class CustomerService {

	@Autowired
	private CustomerDao customerDao;

	@PersistenceContext
	private EntityManager entityManager;

	/**
	 * Get customer by Id
	 * 
	 * @param id to get detail
	 * @return
	 */
	public Customer getById(int id) {
		Customer res = customerDao.getBy(id);
		return res;
	}

	/**
	 * Search customer(s) by name, address, phone number
	 * 
	 * @param keyword to search like
	 * @return
	 */
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

	/**
	 * Get customer(s) by date range
	 * 
	 * @param dFrom from date
	 * @param dTo   to date
	 * @return
	 */
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

	/**
	 * Create/ Update customer
	 * 
	 * @param m model customer
	 * @return
	 */
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

	/**
	 * Remove customer by Id
	 * 
	 * @param id
	 * @return
	 */
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
	
	public String removes(List<Object> id) throws Exception {
		String res = "";

		for(Object i : id) {
			customerDao.deleteById(Integer.parseInt(i.toString()));
		}

		return res;
	}

}