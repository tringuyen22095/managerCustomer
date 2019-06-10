package com.example.demo.bll.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.CustomerService;
import com.example.demo.dao.CustomerDao;
import com.example.demo.model.Customer;
import com.example.demo.req.BaseReq;

@Service(value = "customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerDao;

	public Customer getById(int id) {
		Customer res = customerDao.findById(id).orElse(null);
		return res;
	}

	public List<Customer> search(BaseReq req) throws Exception {
		List<Customer> res;
		if (!req.getKeyword().isEmpty()) {
			res = StreamSupport.stream(customerDao.findAll().spliterator(), false)
					.filter(i -> i.getName().contains(req.getKeyword()) || i.getAddress().contains(req.getKeyword())
							|| i.getPhone().contains(req.getKeyword())
							|| i.getCompany().getName().contains(req.getKeyword()))
					.skip((req.getPage() - 1) * req.getShow()).limit(req.getShow()).collect(Collectors.toList());
		} else {
			res = StreamSupport.stream(customerDao.findAll().spliterator(), false)
					.filter(i -> i.getDob().after(req.getdFrom()) && i.getDob().before(req.getdTo()))
					.skip((req.getPage() - 1) * req.getShow()).collect(Collectors.toList());
		}

		return res;
	}

	public String save(Customer m) {
		String res = "";

		Integer id = m.getId();

		Customer m1;
		if (id == null || id == 0) {
			m1 = customerDao.save(m);
		} else {
			m1 = customerDao.findById(id).orElse(null);
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

		Customer m = customerDao.findById(id).orElse(null);
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