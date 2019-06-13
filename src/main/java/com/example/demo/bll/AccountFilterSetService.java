package com.example.demo.bll;

import java.util.List;

import com.example.demo.model.AccountFilterSet;

public interface AccountFilterSetService {

	public List<AccountFilterSet> findAllByAccUid(String uid, String keyword);

	public AccountFilterSet findAllByAccFilter(String uid, Integer id);

	public String save(AccountFilterSet m);

	public String remove(Integer id);

	public AccountFilterSet findDefault(String uid);

}