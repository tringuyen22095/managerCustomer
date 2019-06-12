package com.example.demo.bll;

import com.example.demo.model.FilterSet;

public interface FilterSetService {

	public FilterSet save(FilterSet m);

	public String remove(Integer id);

	public FilterSet findById(Integer id);
	
}