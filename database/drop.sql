--Drop tables
DROP TABLE IF EXISTS pinwise.pin_type CASCADE;
DROP TABLE IF EXISTS pinwise.pin CASCADE;
DROP TABLE IF EXISTS pinwise.user CASCADE;
DROP TABLE IF EXISTS pinwise.service CASCADE;
DROP TABLE IF EXISTS pinwise.passwd_toekn CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS check_admin_permission_trigger ON pinwise.user;
DROP TRIGGER IF EXISTS validate_email_trigger ON pinwise.user;
DROP TRIGGER IF EXISTS validate_coordinates ON pinwise.pin;
DROP TRIGGER IF EXISTS validate_age ON pinwise.user;
DROP TRIGGER IF EXISTS date_update ON pinwise.pin;

-- Drop functions
DROP FUNCTION IF EXISTS pinwise.check_admin_permission();
DROP FUNCTION IF EXISTS pinwise.validate_email();
DROP FUNCTION IF EXISTS pinwise.check_coordinates();
DROP FUNCTION IF EXISTS pinwise.check_age();
DROP FUNCTION IF EXISTS pinwise.set_date();



