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

--walidacja od strony serwera moze?? bo regexy itd
--przy usuwaniu usuwaja sie WSZYSTKIE dane zwiazane z uzytkownikiem


--TODO: uzyc pgcrypto by szyfrować i deszyfrować hasła


-- na razie tylko administrator może zmienić swój nickname, to może być jeszcze zmienione
CREATE OR REPLACE FUNCTION pinwise.check_admin_permission()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username <> OLD.username AND NOT OLD.isadmin THEN
        RAISE EXCEPTION 'Only administrators can change usernames!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_admin_permission_trigger
BEFORE UPDATE OF username ON pinwise."user"
FOR EACH ROW EXECUTE FUNCTION pinwise.check_admin_permission();