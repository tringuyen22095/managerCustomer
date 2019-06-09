package com.example.demo.bll;

import java.util.List;

import com.example.demo.dto.CompanyDto;
import com.example.demo.model.Company;

public interface CompanyService {

	/**
	 * Search company by name, address, phone number
	 * 
	 * @param keyword to search like
	 * @return
	 */
	public List<CompanyDto> search(String keyword);

	/**
	 * Get company by Id
	 * 
	 * @param id to get detail
	 * @return
	 */
	public Company getById(int id);

	/**
	 * Create/ Update company
	 * 
	 * @param m model company
	 * @return
	 */
	public String save(Company m);

	/**
	 * Remove company by Id
	 * 
	 * @param id
	 * @return
	 */
	public String remove(int id);

}