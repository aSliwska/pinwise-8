drop schema if exists pinwise cascade;
create schema pinwise;


CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table pinwise.user (
	id SERIAL primary key,
	username varchar(32) not null unique, --nie mozna zmieniac
	email varchar(128) not null unique,
	password text not null, --CREATE EXTENSION pgcrypto;
	gender varchar (32),
	age int,
	education varchar (32),
	active bool default false,
	isadmin bool default false
);

create table pinwise.pin(
	id SERIAL primary key,
	user_id int not null unique,
	coordinateX float not null,
	coordinateY float not null,
	constraint fk_pin foreign key (user_id) references pinwise.user (id) on delete cascade
);

create table pinwise.pin_type(
	id SERIAL primary key,
	category varchar(16) not null, --firma lub usługa (constraint), ew. 'inne'
	nameof varchar(1024) not null --np Lidl
);

create table pinwise.categories(
	id_pin_type INT not null,
	id_pin INT not null,
	constraint fk_pinT foreign key (id_pin_type) references pinwise.pin_type (id) on delete set null,
	constraint fk_pin foreign key (id_pin) references pinwise.pin(id) on delete cascade,
	constraint pk primary key (id_pin_type, id_pin)
);

