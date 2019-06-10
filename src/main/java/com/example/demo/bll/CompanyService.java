package com.example.demo.bll;

import java.util.List;

import com.example.demo.model.Company;
import com.example.demo.req.BaseReq;

public interface CompanyService {

	/**
	 * Search company by name, address, phone number
	 * 
	 * @param keyword to search like
	 * @return
	 */
	public List<Company> search(BaseReq req);

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