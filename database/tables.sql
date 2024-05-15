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

create table pinwise.pin(
	id SERIAL PRIMARY KEY,
	user_id int NOT NULL UNIQUE,
	coordinateX float NOT NULL,
	coordinateY float NOT NULL,
	adres varchar(512) NOT NULL,
	id_serwis int,
	modification_date DATE --YYYY-MM-DD format
	constraint fk_pin foreign key (user_id) references pinwise.user (id) on delete CASCADE
	CONSTRAINT fk_serv FOREIGN KEY (id_serwis) REFERENCES pinwise.service(id) ON DELETE SET NULL
);

create table pinwise.pin_type(
	id SERIAL PRIMARY KEY,
	category varchar(16) NOT NULL, --firma lub usługa (constraint), ew. 'inne'
	nameof varchar(1024) NOT NULL --np Lidl lub Fryzjer, lub sklep
);

create table pinwise.categories(
	id_pin_type INT not null,
	id_pin INT not null,
	constraint fk_pinT foreign key (id_pin_type) references pinwise.pin_type (id) on delete set null,
	constraint fk_pin foreign key (id_pin) references pinwise.pin(id) on delete cascade,
	constraint pk primary key (id_pin_type, id_pin)
);

CREATE TABLE pinwise.service(
	id SERIAL PRIMARY KEY,
	name varchar(128),
	tag_key TEXT,
	tag_value TEXT,
	icon_name TEXT
);