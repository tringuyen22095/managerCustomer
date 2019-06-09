package com.example.demo.bll;

import java.util.Date;
import java.util.List;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.Customer;

public interface CustomerService {

	/**
	 * Get customer by Id
	 * 
	 * @param id to get detail
	 * @return
	 */
	public Customer getById(int id);

	/**
	 * Search customer(s) by name, address, phone number
	 * 
	 * @param keyword to search like
	 * @return
	 */
	public List<CustomerDto> search(String keyword) throws Exception;

	/**
	 * Get customer(s) by date range
	 * 
	 * @param dFrom from date
	 * @param dTo   to date
	 * @return
	 */
	public List<CustomerDto> search(Date dFrom, Date dTo);

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

}