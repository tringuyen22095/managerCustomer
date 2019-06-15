DROP TABLE IF EXISTS PUBLIC."account";
CREATE TABLE PUBLIC."account"
(
	"uid"					varchar(64) PRIMARY KEY,
	"pwd"					varchar(64),
	"name"				varchar(64),
	"pwd_hash"		varchar(256)
);

DROP TABLE IF EXISTS PUBLIC."company";
CREATE TABLE PUBLIC."company"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(256)
);

DROP TABLE IF EXISTS PUBLIC."customer";
CREATE TABLE PUBLIC."customer"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(64),
	"phone"				varchar(64),
	"email"				varchar(256),DROP TABLE IF EXISTS PUBLIC."account";
CREATE TABLE PUBLIC."account"
(
	"uid"					varchar(64) PRIMARY KEY,
	"pwd"					varchar(64),
	"name"				varchar(64),
	"pwd_hash"		varchar(256)
);
select * from customer
DROP TABLE IF EXISTS PUBLIC."company";
CREATE TABLE PUBLIC."company"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(256)
);

DROP TABLE IF EXISTS PUBLIC."customer";
CREATE TABLE PUBLIC."customer"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(64),
	"phone"				varchar(64),
	"email"				varchar(256),
	"address"			varchar(256),
	"dob"					TIMESTAMP,
	"company_id"	INT REFERENCES company(id)
);

DROP TABLE IF EXISTS PUBLIC."filter_set";
CREATE TABLE PUBLIC."filter_set"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(256),
	"filter"			text
);

DROP TABLE IF EXISTS PUBLIC."account_filter_set";
CREATE TABLE PUBLIC."account_filter_set"
(
	"acc_id"					varchar(256) REFERENCES account(uid),
	"filter_id"				INT REFERENCES filter_set("id"),
	PRIMARY key ("acc_id", "filter_id")
	
);
	"address"			varchar(256),
	"dob"					TIMESTAMP,
	"company_id"	INT REFERENCES company(id)
);

DROP TABLE IF EXISTS PUBLIC."filter_set";
CREATE TABLE PUBLIC."filter_set"
(
	"id"					SERIAL PRIMARY KEY,
	"name"				varchar(256),
	"filter"			text,
	"company_id"		int references company("id")
);

DROP TABLE IF EXISTS PUBLIC."account_filter_set";
CREATE TABLE PUBLIC."account_filter_set"
(
	"id"					SERIAL PRIMARY KEY,
	"acc_uid"					varchar(256) REFERENCES account(uid),
	"filter_id"				INT REFERENCES filter_set("id"),
	"is_default"					boolean DEFAULT(false)
);