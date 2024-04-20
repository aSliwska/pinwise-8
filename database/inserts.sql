--1
INSERT INTO pinwise.user (username, password, email, gender, age, education, active, isadmin)
VALUES 
('Jan1', crypt('password1', gen_salt('bf')), 'jan@example.com', 'Male', 25, 'Graduate', true, false),
('Anna', crypt('password2', gen_salt('bf')), 'anna@example.com', 'Female', 30, 'Postgraduate', true, false),
('Piotr', crypt('password3', gen_salt('bf')), 'piotr@example.com', 'Male', 35, 'Doctorate', false, false),
('Katarzyna', crypt('password4', gen_salt('bf')), 'katarzyna@example.com', 'Female', 40, 'Graduate', true, false),
('Andrzej', crypt('password5', gen_salt('bf')), 'andrzej@example.com', 'Male', 45, 'Postgraduate', false, false),
('Agnieszka', crypt('password6', gen_salt('bf')), 'agnieszka@example.com', 'Female', 50, 'Doctorate', true, false),
('Tomasz', crypt('password7', gen_salt('bf')), 'tomasz@example.com', 'Male', 55, 'Graduate', false, false),
('Ewa', crypt('password8', gen_salt('bf')), 'ewa@example.com', 'Female', 60, 'Postgraduate', true, false),
('Marek', crypt('password9', gen_salt('bf')), 'marek@example.com', 'Male', 65, 'Doctorate', false, false),
('Magdalena', crypt('password10', gen_salt('bf')), 'magdalena@example.com', 'Female', 70, 'Graduate', true, false),
('Michal33', crypt('password11', gen_salt('bf')), 'michal@example.com', 'Male', 25, 'Postgraduate', false, false),
('Dorota', crypt('password12', gen_salt('bf')), 'dorota@example.com', 'Female', 30, 'Doctorate', true, false),
('Pawel', crypt('password13', gen_salt('bf')), 'pawel@example.com', 'Male', 35, 'Graduate', false, false),
('Joanna', crypt('password14', gen_salt('bf')), 'joanna@example.com', 'Female', 40, 'Postgraduate', true, false),
('Krzysztof', crypt('password15', gen_salt('bf')), 'krzysztof@example.com', 'Male', 45, 'Doctorate', false, false),
('Barbara', crypt('password16', gen_salt('bf')), 'barbara@example.com', 'Female', 50, 'Graduate', true, false),
('Marcin', crypt('password17', gen_salt('bf')), 'marcin@example.com', 'Male', 55, 'Postgraduate', false, false),
('Monika', crypt('password18', gen_salt('bf')), 'monika@example.com', 'Female', 60, 'Doctorate', true, false),
('Grzegorz', crypt('password19', gen_salt('bf')), 'grzegorz@example.com', 'Male', 65, 'Graduate', false, false),
('Malgorzata', crypt('password20', gen_salt('bf')), 'malgorzata@example.com', 'Female', 70, 'Postgraduate', true, false);

--2
INSERT INTO pinwise.pin_type (category, nameof) VALUES 
('Firma', 'Biedronka'),
('Usluga', 'Usluga sprzatająca'),
('Firma', 'Lewiatan'),
('Usluga', 'Usluga hydrauliczna'),
('Firma', 'Tesco'),
('Usluga', 'Usluga elektryczna'),
('Firma', 'Auchan'),
('Usluga', 'Usluga stolarska'),
('Firma', 'Carrefour'),
('Usluga', 'Usluga ogrodnicza'),
('Firma', 'Kaufland'),
('Usluga', 'Usluga malarska'),
('Firma', 'Piotr i Pawel'),
('Usluga', 'Usluga slusarska'),
('Firma', 'Zabka');


--3
INSERT INTO pinwise.pin(user_id, coordinateX, coordinateY) 
VALUES 
((SELECT id FROM pinwise.user WHERE username='Jan1'), 21.37, 1.69),
((SELECT id FROM pinwise.user WHERE username='Anna'), -22.36, 2.71),
((SELECT id FROM pinwise.user WHERE username='Piotr'), 23.36, 3.72),
((SELECT id FROM pinwise.user WHERE username='Katarzyna'), -24.36, 4.73),
((SELECT id FROM pinwise.user WHERE username='Andrzej'), 25.36, 5.74),
((SELECT id FROM pinwise.user WHERE username='Agnieszka'), -26.36, -6.75),
((SELECT id FROM pinwise.user WHERE username='Tomasz'), 27.36, 7.76),
((SELECT id FROM pinwise.user WHERE username='Ewa'), 28.36, 8.77),
((SELECT id FROM pinwise.user WHERE username='Marek'), -29.36, 9.78),
((SELECT id FROM pinwise.user WHERE username='Magdalena'), 30.36, -10.79),
((SELECT id FROM pinwise.user WHERE username='Michal33'), 31.36, 11.80),
((SELECT id FROM pinwise.user WHERE username='Dorota'), -32.36, 12.81),
((SELECT id FROM pinwise.user WHERE username='Pawel'), 33.36, -13.82),
((SELECT id FROM pinwise.user WHERE username='Joanna'), 34.36, 14.83),
((SELECT id FROM pinwise.user WHERE username='Krzysztof'), -35.36, -15.84),
((SELECT id FROM pinwise.user WHERE username='Barbara'), 36.36, 16.85),
((SELECT id FROM pinwise.user WHERE username='Marcin'), 37.36, 17.86),
((SELECT id FROM pinwise.user WHERE username='Monika'), 38.36, -18.87),
((SELECT id FROM pinwise.user WHERE username='Grzegorz'), -39.36, 19.88),
((SELECT id FROM pinwise.user WHERE username='Malgorzata'), 40.36, 20.89);


--4
INSERT INTO pinwise.categories (id_pin_type, id_pin)
VALUES
((select p.id from pinwise.pin_type p where p.nameof='Tesco'), (select p.id from pinwise.pin p where p.coordinateX=21.37 and p.coordinateY=1.69)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga sprzatająca'), (select p.id from pinwise.pin p where p.coordinateX=-22.36 and p.coordinateY=2.71)),
((select p.id from pinwise.pin_type p where p.nameof='Lewiatan'), (select p.id from pinwise.pin p where p.coordinateX=23.36 and p.coordinateY=3.72)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga hydrauliczna'), (select p.id from pinwise.pin p where p.coordinateX=-24.36 and p.coordinateY=4.73)),
((select p.id from pinwise.pin_type p where p.nameof='Tesco'), (select p.id from pinwise.pin p where p.coordinateX=25.36 and p.coordinateY=5.74)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga elektryczna'), (select p.id from pinwise.pin p where p.coordinateX=-26.36 and p.coordinateY=-6.75)),
((select p.id from pinwise.pin_type p where p.nameof='Auchan'), (select p.id from pinwise.pin p where p.coordinateX=27.36 and p.coordinateY=7.76)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga stolarska'), (select p.id from pinwise.pin p where p.coordinateX=28.36 and p.coordinateY=8.77)),
((select p.id from pinwise.pin_type p where p.nameof='Carrefour'), (select p.id from pinwise.pin p where p.coordinateX=-29.36 and p.coordinateY=9.78)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga ogrodnicza'), (select p.id from pinwise.pin p where p.coordinateX=30.36 and p.coordinateY=-10.79)),
((select p.id from pinwise.pin_type p where p.nameof='Kaufland'), (select p.id from pinwise.pin p where p.coordinateX=31.36 and p.coordinateY=11.80)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga malarska'), (select p.id from pinwise.pin p where p.coordinateX=-32.36 and p.coordinateY=12.81)),
((select p.id from pinwise.pin_type p where p.nameof='Piotr i Pawel'), (select p.id from pinwise.pin p where p.coordinateX=33.36 and p.coordinateY=-13.82)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga slusarska'), (select p.id from pinwise.pin p where p.coordinateX=34.36 and p.coordinateY=14.83)),
((select p.id from pinwise.pin_type p where p.nameof='Zabka'), (select p.id from pinwise.pin p where p.coordinateX=-35.36 and p.coordinateY=-15.84)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga ogrodnicza'), (select p.id from pinwise.pin p where p.coordinateX=36.36 and p.coordinateY=16.85)),
((select p.id from pinwise.pin_type p where p.nameof='Kaufland'), (select p.id from pinwise.pin p where p.coordinateX=37.36 and p.coordinateY=17.86)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga malarska'), (select p.id from pinwise.pin p where p.coordinateX=38.36 and p.coordinateY=-18.87)),
((select p.id from pinwise.pin_type p where p.nameof='Piotr i Pawel'), (select p.id from pinwise.pin p where p.coordinateX=-39.36 and p.coordinateY=19.88)),
((select p.id from pinwise.pin_type p where p.nameof='Usluga slusarska'), (select p.id from pinwise.pin p where p.coordinateX=40.36 and p.coordinateY=20.89));


--SELECT (password = crypt('entered password', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
--SELECT (password = crypt('haslomaslo', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
--SELECT (password = crypt('hasłomasło', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm'; -- zwraca true
