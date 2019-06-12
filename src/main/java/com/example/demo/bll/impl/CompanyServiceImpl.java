package com.example.demo.bll.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.CompanyService;
import com.example.demo.dao.CompanyDao;
import com.example.demo.model.Company;
import com.example.demo.req.BaseReq;

@Service(value = "companyService")
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyDao companyDao;

	@PersistenceContext
	private EntityManager entityManager;

	public List<Company> search(BaseReq req) {
		List<Company> res = StreamSupport.stream(companyDao.findAll().spliterator(), false)
				.filter(i -> i.getName().toUpperCase().contains(req.getKeyword())).collect(Collectors.toList());

		return res;
	}

	public Company findById(int id) {
		return companyDao.findById(id).orElse(null);
	}

	public String save(Company m) {
		String res = "";

		Integer id = m.getId();

		Company m1;
		if (id == null || id == 0) {
			m1 = companyDao.save(m);
		} else {
			m1 = findById(id);
			if (m1 == null) {
				res = "Id does not exist.";
			} else {
				m1.setName(m.getName());

				companyDao.save(m1);
			}
		}

		return res;
	}

	public String remove(int id) {
		String res = "";

		Company m = findById(id);
		if (m != null) {
			companyDao.delete(m);
		} else {
			res = "Id does not exist.";
		}

		return res;
	}

}