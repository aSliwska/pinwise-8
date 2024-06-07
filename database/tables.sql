drop schema if exists pinwise cascade;
create schema pinwise;


CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table pinwise.user (
	id SERIAL PRIMARY KEY,
	username varchar(32) NOT NULL UNIQUE, --nie mozna zmieniac
	email varchar(128) NOT NULL UNIQUE,
	password text NOT NULL, --CREATE EXTENSION pgcrypto;
	gender varchar (32),
	age int,
	education varchar (32),
	active bool DEFAULT FALSE,
	isadmin bool DEFAULT FALSE 
);

CREATE TABLE pinwise.service(
	id SERIAL PRIMARY KEY,
	name varchar(128) NOT NULL,
	tag_key TEXT NOT NULL,
	tag_value TEXT NOT NULL
);

create table pinwise.pin_type(
	id SERIAL PRIMARY KEY,
	category varchar(16) NOT NULL --firma lub usługa (constraint)
);

create table pinwise.pin(
	id SERIAL PRIMARY KEY,
	user_id int NOT NULL,
	coordinateX float NOT NULL,
	coordinateY float NOT NULL,
	adres varchar(512) NOT NULL,
	id_serwis int NOT NULL,
	modification_date TIMESTAMP NOT NULL DEFAULT NOW(), --YYYY-MM-DD godzina:minuta:sekunda z 6 miejscami po przecinku
	company_name VARCHAR(512),
	type_id int, 
	constraint fk_pin foreign key (user_id) references pinwise.user (id) on delete CASCADE,
	CONSTRAINT fk_serv FOREIGN KEY (id_serwis) REFERENCES pinwise.service(id) ON DELETE cascade,
	CONSTRAINT fk_pint FOREIGN KEY (type_id) REFERENCES pinwise.pin_type(id)
);

create table pinwise.passwd_token (
	id INT not null,
	token text,
	expiry_date TIMESTAMP,
	constraint fk_id foreign key (id) references pinwise.user(id) on delete CASCADE
)


