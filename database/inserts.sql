insert into pinwise.user (username, email, password, gender, age, education)
values ('jusernejm', 'kkk@kkk.pl', crypt('hasłomasło', gen_salt('bf')), 'man', 13, 'srednie');

--insert into pinwise.user (username, email, password, gender, age, education)
--values ('jusernejm', 'a@kkk.pl', crypt('hasłomasło', gen_salt('bf')), 'man', 13, 'srednie'); --> error

--insert into pinwise.user (username, email, password, gender, age, education)
--values ('jwwwsernejm', 'kkk#ksddssdk.pfsfsl', crypt('hasłomasło', gen_salt('bf')), 'man', 13, 'srednie'); -->INVALID ADDRESS FORMAT

select * from pinwise.user;

SELECT (password = crypt('entered password', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
SELECT (password = crypt('haslomaslo', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
SELECT (password = crypt('hasłomasło', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm'; -- zwraca true


INSERT INTO pinwise.pin(user_id, coordinateX, coordinateY) VALUES (5, 21.36, 69.69);

INSERT INTO pinwise.pin_type (category, nameof)
VALUES ('Company', 'Lidl');

INSERT INTO pinwise.categories (id_pin_type, id_pin)
VALUES (1, 1);



DELETE from pinwise.user p where p.username ='jusernejm';