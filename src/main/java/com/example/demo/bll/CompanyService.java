package com.example.demo.bll;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dao.CompanyDao;
import com.example.demo.dto.CompanyDto;
import com.example.demo.model.Company;

@Service(value = "companyService")
@Transactional
public class CompanyService {

	@Autowired
	private CompanyDao companyDao;

	@PersistenceContext
	private EntityManager entityManager;

	/**
	 * Search company by name, address, phone number
	 * 
	 * @param keyword to search like
	 * @return
	 */
	public List<CompanyDto> search(String keyword) {
		List<Company> res = companyDao.search(keyword);

		List<CompanyDto> lData = new ArrayList<>();
		for (Company i : res) {
			lData.add(new CompanyDto(i.getId(), i.getName()));
		}

		return lData;
	}

	/**
	 * Get company by Id
	 * 
	 * @param id to get detail
	 * @return
	 */
	public Company getById(int id) {
		Company res = companyDao.getBy(id);
		return res;
	}

	/**
	 * Create/ Update company
	 * 
	 * @param m model company
	 * @return
	 */
	public String save(Company m) {
		String res = "";

		Integer id = m.getId();

		Company m1;
		if (id == null || id == 0) {
			m1 = companyDao.save(m);
		} else {
			m1 = getById(id);
			if (m1 == null) {
				res = "Id does not exist.";
			} else {
				m1.setName(m.getName());

				companyDao.save(m1);
			}
		}

		return res;
	}

	/**
	 * Remove company by Id
	 * 
	 * @param id
	 * @return
	 */
	public String remove(int id) {
		String res = "";

		Company m = companyDao.getBy(id);
		if (m != null) {
			companyDao.delete(m);
		} else {
			res = "Id does not exist.";
		}

		return res;
	}

}