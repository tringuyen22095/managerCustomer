package com.example.demo.bll;

import java.util.List;

import com.example.demo.model.Customer;
import com.example.demo.req.BaseReq;

public interface CustomerService {

	/**
	 * Get customer by Id
	 * 
	 * @param id to get detail
	 * @return
	 */
	public Customer findById(int id);

	/**
	 * Search customer(s) by name, address, phone number, company name OR Date of
	 * birth
	 * 
	 * @param keyword
	 * @param dFrom
	 * @param dTo
	 * @return
	 * @throws Exception
	 */
	public List<Customer> search(BaseReq req) throws Exception;

	/**
	 * Create/ Update customer
	 * 
	 * @param m model customer
	 * @return
	 */
	public String save(Customer m);

	/**
	 * Remove customer by Id
	 * 
	 * @param id
	 * @return
	 */
	public String remove(int id);

	/**
	 * Remove multi records
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public String removes(Iterable<Integer> id) throws Exception;
	
	public List<Customer> get(int current);

}