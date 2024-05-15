--1---------------------------
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
BEFORE UPDATE OF username ON pinwise.user
FOR EACH ROW EXECUTE FUNCTION pinwise.check_admin_permission();


--2---------------------------
CREATE OR REPLACE FUNCTION pinwise.validate_email()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email IS NOT NULL AND NEW.email !~* '^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$' THEN
        RAISE EXCEPTION 'Invalid email address format!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_email_trigger
BEFORE INSERT OR UPDATE OF email ON pinwise.user
FOR EACH ROW EXECUTE FUNCTION pinwise.validate_email();


--3---------------------------
CREATE OR REPLACE FUNCTION pinwise.check_coordinates()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.coordinateX > 90 OR NEW.coordinateX < -90 THEN
        RAISE EXCEPTION 'CoordinateX out of range (-90,90)!';
    END IF;
    IF NEW.coordinateY > 180 OR NEW.coordinateY < -180 THEN
        RAISE EXCEPTION 'CoordinateY out of range (-180,180)!';
    END IF;
    IF EXISTS (SELECT 1 FROM pinwise.pin WHERE coordinateX = NEW.coordinateX AND coordinateY = NEW.coordinateY) THEN
        RAISE EXCEPTION 'Coordinates already exist in the database!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_coordinates
BEFORE INSERT OR UPDATE OF coordinateX, coordinateY ON pinwise.pin
FOR EACH ROW EXECUTE FUNCTION pinwise.check_coordinates();


--4---------------------------
CREATE OR REPLACE FUNCTION pinwise.check_age()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.age < 0 THEN
        RAISE EXCEPTION 'User age must be bigger than 0!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_age
BEFORE INSERT OR UPDATE OF age ON pinwise.user
FOR EACH ROW EXECUTE FUNCTION pinwise.check_age();

