package com.example.demo.bll.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.AccountFilterSetService;
import com.example.demo.dao.AccountFilterSetDao;
import com.example.demo.dao.FilterSetDao;
import com.example.demo.model.AccountFilterSet;
import com.example.demo.model.FilterSet;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service(value = "accountFilterSetService")
@Transactional
public class AccountFilterSetServiceImpl implements AccountFilterSetService {

	@Autowired
	private AccountFilterSetDao accountFilterSetDao;

	@Autowired
	private FilterSetDao filterSetDao;

	public List<AccountFilterSet> findAllByAccUid(String uid, String keyword) {
		List<AccountFilterSet> res = StreamSupport.stream(accountFilterSetDao.findAll().spliterator(), false)
				.filter(i -> i.getAcc().getUid().equals(uid)
						&& i.getFilter().getName().toUpperCase().trim().contains(keyword.toUpperCase().trim()))
				.collect(Collectors.toList());

		return res;
	}

	public AccountFilterSet getById(Integer id) {
		return accountFilterSetDao.findById(id).orElse(null);
	}

	/**
	 * Set default or change name filter
	 */
	public String save(AccountFilterSet m) {
		String res = "";

		Integer id = m.getId();

		AccountFilterSet m1;
		if (id == null) {
			m1 = accountFilterSetDao.save(m);
		} else {
			m1 = getById(id);
			if (m1 == null) {
				res = "Id does not exist.";
			} else {
				m1.setIsDefault(m.getIsDefault());
				if (m.getFilter() != null) {//Update filter
					ObjectMapper mapper = new ObjectMapper();
					FilterSet m2 = mapper.convertValue(m.getFilter(), FilterSet.class);

					filterSetDao.save(m2);
				}
				accountFilterSetDao.save(m1);
			}
		}

		return res;
	}

	public String remove(Integer id) {
		String res = "";

		AccountFilterSet m = getById(id);
		if (m != null) {
			accountFilterSetDao.delete(m);
		} else {
			res = "Id does not exist.";
		}

		return res;
	}

	public AccountFilterSet findAllByAccFilter(String uid, Integer id) {
		AccountFilterSet res = StreamSupport.stream(accountFilterSetDao.findAll().spliterator(), false)
				.filter(i -> i.getAcc().getUid().equals(uid)).findFirst().orElse(null);

		return res;
	}

	public AccountFilterSet findDefault(String uid) {
		AccountFilterSet res = StreamSupport.stream(accountFilterSetDao.findAll().spliterator(), false)
				.filter(i -> i.getIsDefault() && i.getAcc().getUid().equals(uid)).findFirst().orElse(null);
		if(res == null) {
			res = new AccountFilterSet();
			FilterSet fs = new FilterSet();
			fs.setFilter("");
			res.setFilter(fs);
		}
		return res;
	}

}