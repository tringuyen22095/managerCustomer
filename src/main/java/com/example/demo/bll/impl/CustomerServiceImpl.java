package com.example.demo.bll.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.CustomerService;
import com.example.demo.common.Const;
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

		res = StreamSupport.stream(customerDao.findAll().spliterator(), false).collect(Collectors.toList());
		res = res.stream().filter(i -> 
				(req.getFilter().size() == 0
						&& i.getName().contains("")) ||
				(req.getFilter().indexOf(Const.filterCustomer.Customer_Name.name()) != -1
						&& i.getName().toUpperCase().trim().contains(req.getKeyword().toUpperCase().trim())) ||
				(req.getFilter().indexOf(Const.filterCustomer.Address.name()) != -1
						&& i.getAddress().toUpperCase().trim().contains(req.getKeyword().toUpperCase().trim())) ||
				(req.getFilter().indexOf(Const.filterCustomer.Phone.name()) != -1
						&& i.getPhone().toUpperCase().trim().contains(req.getKeyword().toUpperCase().trim())) ||
				(req.getFilter().indexOf(Const.filterCustomer.Email.name()) != -1
						&& i.getEmail().toUpperCase().trim().contains(req.getKeyword().toUpperCase().trim())) ||
				(req.getFilter().indexOf(Const.filterCustomer.Company_Name.name()) != -1
						&& i.getCompany().getName().toUpperCase().trim().contains(req.getKeyword().toUpperCase().trim())) ||
				(req.getFilter().indexOf(Const.filterCustomer.Date_of_birth.name()) != -1
						&& i.getDob().after(req.getdFrom()) && i.getDob().before(req.getdTo())))
				.collect(Collectors.toList());

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