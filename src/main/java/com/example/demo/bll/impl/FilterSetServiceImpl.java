package com.example.demo.bll.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.bll.FilterSetService;
import com.example.demo.dao.FilterSetDao;
import com.example.demo.model.FilterSet;

@Service(value = "filterSetService")
@Transactional
public class FilterSetServiceImpl implements FilterSetService {

	@Autowired
	private FilterSetDao filterSetDao;

	public FilterSet findById(Integer id) {
		return filterSetDao.findById(id).orElse(null);
	}

	public FilterSet getById(int id) {
		return filterSetDao.findById(id).orElse(null);
	}

	public FilterSet save(FilterSet m) {
		Integer id = m.getId();

		FilterSet m1;
		if (id == null || id == 0) {
			m1 = filterSetDao.save(m);
		} else {
			m1 = getById(id);
			if (m1 != null) {
				m1.setName(m.getName());
				m1.setFilter(m.getFilter());

				m1 = filterSetDao.save(m1);
			}
		}

		return m1;
	}

	public String remove(Integer id) {
		String res = "";

		FilterSet m = getById(id);
		if (m != null) {
			filterSetDao.delete(m);
		} else {
			res = "Id does not exist.";
		}

		return res;
	}

}