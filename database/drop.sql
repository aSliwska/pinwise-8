--Drop tables
DROP TABLE IF EXISTS pinwise.categories;
DROP TABLE IF EXISTS pinwise.pin_type;
DROP TABLE IF EXISTS pinwise.pin;
DROP TABLE IF EXISTS pinwise.user;
DROP TABLE IF EXISTS pinwise.service;

-- Drop triggers
DROP TRIGGER IF EXISTS check_admin_permission_trigger ON pinwise.user;
DROP TRIGGER IF EXISTS validate_email_trigger ON pinwise.user;
DROP TRIGGER IF EXISTS validate_coordinates ON pinwise.pin;
DROP TRIGGER IF EXISTS validate_age ON pinwise.user;

-- Drop functions
DROP FUNCTION IF EXISTS pinwise.check_admin_permission();
DROP FUNCTION IF EXISTS pinwise.validate_email();
DROP FUNCTION IF EXISTS pinwise.check_coordinates();
DROP FUNCTION IF EXISTS pinwise.check_age();




