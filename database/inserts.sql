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
INSERT INTO pinwise.service (name, tag_key, tag_value) VALUES
('Hotel dla zwierząt', 'amenity', 'animal_boarding'),
('Schronisko dla zwierząt', 'amenity', 'animal_shelter'),
('Szkoła dla zwierząt', 'amenity', 'animal_training'),
('Centrum sztuki', 'amenity', 'arts_centre'),
('Bankomat', 'amenity', 'atm'),
('Okienko życia', 'amenity', 'baby_hatch'),
('Bank', 'amenity', 'bank'),
('Bar', 'amenity', 'bar'),
('Grill', 'amenity', 'bbq'),
('Ławka', 'amenity', 'bench'),
('Parking rowerowy', 'amenity', 'bicycle_parking'),
('Wypożyczalnia rowerów', 'amenity', 'bicycle_rental'),
('Stacja naprawy rowerów', 'amenity', 'bicycle_repair_station'),
('Myjnia rowerowa', 'amenity', 'bicycle_wash'),
('Ogródek piwny', 'amenity', 'biergarten'),
('Kantor wymiany walut', 'amenity', 'bureau_de_change'),
('Przystanek autobusowy', 'amenity', 'bus_station'),
('Kawiarnia', 'amenity', 'cafe'),
('Wypożyczalnia samochodów', 'amenity', 'car_rental'),
('Miejsce współdzielenia samochodów', 'amenity', 'car_sharing'),
('Myjnia samochodowa', 'amenity', 'car_wash'),
('Stacja ładowania', 'amenity', 'charging_station'),
('Kino', 'amenity', 'cinema'),
('Klinika', 'amenity', 'clinic'),
('Uczelnia wyższa', 'amenity', 'college'),
('Ośrodek kultury', 'amenity', 'community_centre'),
('Sprężone powietrze', 'amenity', 'compressed_air'),
('Centrum konferencyjne', 'amenity', 'conference_centre'),
('Szkoła tańca', 'amenity', 'dancing_school'),
('Dentysta', 'amenity', 'dentist'),
('Centrum nurkowe', 'amenity', 'dive_centre'),
('Lekarz', 'amenity', 'doctors'),
('Toaleta dla psów', 'amenity', 'dog_toilet'),
('Przebieralnia', 'amenity', 'dressing_room'),
('Woda pitna', 'amenity', 'drinking_water'),
('Plac do nauki jazdy', 'amenity', 'driver_training'),
('Szkoła jazdy', 'amenity', 'driving_school'),
('Miejsce wydarzeń kulturalnych', 'amenity', 'events_venue'),
('Centrum wystawowe', 'amenity', 'exhibition_centre'),
('Fast food', 'amenity', 'fast_food'),
('Szkoła pierwszej pomocy', 'amenity', 'first_aid_school'),
('Stoisko z jedzeniem', 'amenity', 'food_court'),
('Fontanna', 'amenity', 'fountain'),
('Stacja paliw', 'amenity', 'fuel'),
('Skrzynka na darowizny', 'amenity', 'give_box'),
('Pojemnik na piasek lub sól', 'amenity', 'grit_bin'),
('Szpital', 'amenity', 'hospital'),
('Lodziarnia', 'amenity', 'ice_cream'),
('Kafejka internetowa', 'amenity', 'internet_cafe'),
('Przedszkole', 'amenity', 'kindergarten'),
('Kuchnia publiczna', 'amenity', 'kitchen'),
('Szkoła językowa', 'amenity', 'language_school'),
('Biblioteka', 'amenity', 'library'),
('Leżak', 'amenity', 'lounger'),
('Hotel miłości', 'amenity', 'love_hotel'),
('Odbiór paczek', 'amenity', 'mailroom'),
('Targowisko', 'amenity', 'marketplace'),
('Transfer pieniędzy', 'amenity', 'money_transfer'),
('Parking motocyklowy', 'amenity', 'motorcycle_parking'),
('Szkoła muzyczna', 'amenity', 'music_school'),
('Miejsce wydarzeń muzycznych', 'amenity', 'music_venue'),
('Klub nocny', 'amenity', 'nightclub'),
('Dom spokojnej starości', 'amenity', 'nursing_home'),
('Paczkomat', 'amenity', 'parcel_locker'),
('Parking', 'amenity', 'parking'),
('Wejście na parking', 'amenity', 'parking_entrance'),
('Miejsce parkingowe', 'amenity', 'parking_space'),
('Terminal płatniczy', 'amenity', 'payment_terminal'),
('Apteka', 'amenity', 'pharmacy'),
('Budka fotograficzna', 'amenity', 'photo_booth'),
('Planetarium', 'amenity', 'planetarium'),
('Skrzynka pocztowa', 'amenity', 'post_box'),
('Poczta', 'amenity', 'post_office'),
('Pub', 'amenity', 'pub'),
('Publiczna łaźnia', 'amenity', 'public_bath'),
('Wymiana książek', 'amenity', 'public_bookcase'),
('Miejsce recyklingu', 'amenity', 'recycling'),
('Restauracja', 'amenity', 'restaurant'),
('Szambo', 'amenity', 'sanitary_dump_station'),
('Szkoła', 'amenity', 'school'),
('Schronienie', 'amenity', 'shelter'),
('Prysznic', 'amenity', 'shower'),
('Miejsce spotkań kulturalno-społecznych', 'amenity', 'social_centre'),
('Ośrodek pomocy społecznej', 'amenity', 'social_facility'),
('Scena', 'amenity', 'stage'),
('Studio', 'amenity', 'studio'),
('Parking taxi', 'amenity', 'taxi'),
('Telefon', 'amenity', 'telephone'),
('Teatr', 'amenity', 'theatre'),
('Toaleta', 'amenity', 'toilets'),
('Wypożyczalnia zabawek', 'amenity', 'toy_library'),
('Park ruchu drogowego', 'amenity', 'traffic_park'),
('Miejsce szkoleń', 'amenity', 'training'),
('Uniwersytet', 'amenity', 'university'),
('Przegląd pojazdu', 'amenity', 'vehicle_inspection'),
('Automat', 'amenity', 'vending_machine'),
('Weterynarz', 'amenity', 'veterinary'),
('Kosz na śmieci', 'amenity', 'waste_basket'),
('Kontener na śmieci', 'amenity', 'waste_disposal'),
('Śmietnisko', 'amenity', 'waste_transfer_station'),
('Fontanna wody pitnej', 'amenity', 'water_point'),
('Wodopój dla zwierząt', 'amenity', 'watering_place'),
('Waga samochodowa', 'amenity', 'weighbridge'),
('Salon gier', 'leisure', 'amusement_arcade'),
('Estrada', 'leisure', 'bandstand'),
('Kąpielisko', 'leisure', 'bathing_place'),
('Plaża', 'leisure', 'beach_resort'),
('Kryjówka ornitologiczna', 'leisure', 'bird_hide'),
('Trybuny', 'leisure', 'bleachers'),
('Kręgielnia', 'leisure', 'bowling_alley'),
('Klub taneczny', 'leisure', 'dance'),
('Pole do disc golfa', 'leisure', 'disc_golf_course'),
('Park dla psów', 'leisure', 'dog_park'),
('Escape room', 'leisure', 'escape_game'),
('Miejsce na ognisko', 'leisure', 'firepit'),
('Miejsce dla wędkarzy', 'leisure', 'fishing'),
('Centrum fitnesu', 'leisure', 'fitness_centre'),
('Siłownia zewnętrzna', 'leisure', 'fitness_station'),
('Ogród', 'leisure', 'garden'),
('Pole golfowe', 'leisure', 'golf_course'),
('Hackerspace', 'leisure', 'hackerspace'),
('Nauka jazdy konnej', 'leisure', 'horse_riding'),
('Lodowisko', 'leisure', 'ice_rink'),
('Minigolf', 'leisure', 'miniature_golf'),
('Rezerwat przyrody', 'leisure', 'nature_reserve'),
('Altany', 'leisure', 'outdoor_seating'),
('Park', 'leisure', 'park'),
('Stół piknikowy', 'leisure', 'picnic_table'),
('Boisko', 'leisure', 'pitch'),
('Plac zabaw', 'leisure', 'playground'),
('Kurort', 'leisure', 'resort'),
('Sauna', 'leisure', 'sauna'),
('Centrum sportowe', 'leisure', 'sports_centre'),
('Hala sportowa', 'leisure', 'sports_hall'),
('Stadion', 'leisure', 'stadium'),
('Obóz letni', 'leisure', 'summer_camp'),
('Miejsce do pływania', 'leisure', 'swimming_area'),
('Basen', 'leisure', 'swimming_pool'),
('Solarium', 'leisure', 'tanning_salon'),
('Zewnętrzna bieżnia', 'leisure', 'track'),
('Park trampolin', 'leisure', 'trampoline_park'),
('Park wodny', 'leisure', 'water_park'),
('Kryjówka obserwacyjna dzikiej przyrody', 'leisure', 'wildlife_hide'),
('Sklep ogroniczo-rolniczy', 'shop', 'agrarian'),
('Sklep z alkoholem', 'shop', 'alcohol'),
('Sklep dla fanów anime', 'shop', 'anime'),
('Sklep z antykami', 'shop', 'antiques'),
('Sklep z urządzeniami AGD', 'shop', 'appliance'),
('Sklep ze sztuką', 'shop', 'art'),
('Sklep z quadami', 'shop', 'atv'),
('Sklep z artykułami dziecięcymi', 'shop', 'baby_goods'),
('Sklep z torebkami', 'shop', 'bag'),
('Piekarnia', 'shop', 'bakery'),
('Sklep z wyposażeniem łazienkowym', 'shop', 'bathroom_furnishing'),
('Salon piękności', 'shop', 'beauty'),
('Sklep z łóżkami', 'shop', 'bed'),
('Sklep z napojami', 'shop', 'beverages'),
('Sklep rowerowy', 'shop', 'bicycle'),
('Sklep żeglarski', 'shop', 'boat'),
('Zakład bukmacherski', 'shop', 'bookmaker'),
('Księgarnia', 'shop', 'books'),
('Butik', 'shop', 'boutique'),
('Sklep browarniczy', 'shop', 'brewing_supplies'),
('Sklep mięsny', 'shop', 'butcher'),
('Sklep z aparatami fotograficznymi', 'shop', 'camera'),
('Sklep z świeczkami', 'shop', 'candles'),
('Salon samochodowy', 'shop', 'car'),
('Sklep z częściami samochodowymi', 'shop', 'car_parts'),
('Warsztat samochodowy', 'shop', 'car_repair'),
('Sklep z przyczepami kempingowymi', 'shop', 'caravan'),
('Sklep z dywanami', 'shop', 'carpet'),
('Sklep charytatywny', 'shop', 'charity'),
('Serowarnia', 'shop', 'cheese'),
('Apteka', 'shop', 'chemist'),
('Sklep z czekoladą', 'shop', 'chocolate'),
('Sklep z odzieżą', 'shop', 'clothes'),
('Sklep z kawą', 'shop', 'coffee'),
('Sklep kolekcjonerski', 'shop', 'collector'),
('Sklep komputerowy', 'shop', 'computer'),
('Cukiernia', 'shop', 'confectionery'),
('Sklep spożywczy', 'shop', 'convenience'),
('Drukarnia', 'shop', 'copyshop'),
('Sklep z kosmetykami', 'shop', 'cosmetics'),
('Sklep wiejski', 'shop', 'country_store'),
('Sklep z artykułami rzemieślniczymi', 'shop', 'craft'),
('Sklep z zasłonami', 'shop', 'curtain'),
('Mleczarnia', 'shop', 'dairy'),
('Delikatesy', 'shop', 'deli'),
('Dom towarowy', 'shop', 'department_store'),
('Sklep DIY', 'shop', 'doityourself'),
('Sklep z drzwiami', 'shop', 'doors'),
('Pralnia chemiczna', 'shop', 'dry_cleaning'),
('Sklep elektryczny', 'shop', 'electrical'),
('Sklep z elektroniką', 'shop', 'electronics'),
('Sklep z energią', 'shop', 'energy'),
('Sklep z tkaninami', 'shop', 'fabric'),
('Sklep z plonami rolnicznymi', 'shop', 'farm'),
('Sklep z akcesoriami modowymi', 'shop', 'fashion_accessories'),
('Sklep z kominkami', 'shop', 'fireplace'),
('Sklep wędkarski', 'shop', 'fishing'),
('Sklep z podłogami', 'shop', 'flooring'),
('Kwiaciarnia', 'shop', 'florist'),
('Sklep z żywnością', 'shop', 'food'),
('Sklep z ramami obrazów', 'shop', 'frame'),
('Sklep z mrożonkami', 'shop', 'frozen_food'),
('Stacja paliw', 'shop', 'fuel'),
('Sklep meblowy', 'shop', 'furniture'),
('Sklep z grami planszowymi', 'shop', 'games'),
('Centrum ogrodnicze', 'shop', 'garden_centre'),
('Sklep z meblami ogrodowymi', 'shop', 'garden_furniture'),
('Sklep z gazem', 'shop', 'gas'),
('Sklep wielobranżowy', 'shop', 'general'),
('Sklep z prezentami', 'shop', 'gift'),
('Szklarz', 'shop', 'glaziery'),
('Sklep golfowy', 'shop', 'golf'),
('Warzywniak', 'shop', 'greengrocer'),
('Sklep z narzędziami do pielęgnacji terenów', 'shop', 'groundskeeping'),
('Salon fryzjerski', 'shop', 'hairdresser'),
('Sklep z akcesoriami fryzjerskimi', 'shop', 'hairdresser_supply'),
('Sklep z narzędziami', 'shop', 'hardware'),
('Sklep ze zdrową żywnością', 'shop', 'health_food'),
('Salon aparatów słuchowych', 'shop', 'hearing_aids'),
('Zielarz', 'shop', 'herbalist'),
('Sklep z systemami audio', 'shop', 'hifi'),
('Sklep z pościelą i tekstyliami domowymi', 'shop', 'household_linen'),
('Sklep z artykułami gospodarstwa domowego', 'shop', 'houseware'),
('Sklep myśliwski', 'shop', 'hunting'),
('Lodziarnia', 'shop', 'ice_cream'),
('Sklep z dekoracjami wnętrz', 'shop', 'interior_decoration'),
('Jubiler', 'shop', 'jewelry'),
('Kiosk', 'shop', 'kiosk'),
('Sklep kuchenny', 'shop', 'kitchen'),
('Pralnia', 'shop', 'laundry'),
('Sklep ze skórą', 'shop', 'leather'),
('Sklep z oświetleniem', 'shop', 'lighting'),
('Ślusarz', 'shop', 'locksmith'),
('Punkt lotto', 'shop', 'lottery'),
('Centrum handlowe', 'shop', 'mall'),
('Salon masażu', 'shop', 'massage'),
('Sklep z zaopatrzeniem medycznym', 'shop', 'medical_supply'),
('Sklep wojskowy', 'shop', 'military_surplus'),
('Salon telefonó komórkowych', 'shop', 'mobile_phone'),
('Sklep modelarski', 'shop', 'model'),
('Lichwiarz', 'shop', 'money_lender'),
('Salon motocyklowy', 'shop', 'motorcycle'),
('Warsztat motocyklowy', 'shop', 'motorcycle_repair'),
('Sklep muzyczny', 'shop', 'music'),
('Sklep z instrumentami muzycznymi', 'shop', 'musical_instrument'),
('Kiosk z prasą', 'shop', 'newsagent'),
('Sklep ze suplementami diety', 'shop', 'nutrition_supplements'),
('Sklep z orzechami', 'shop', 'nuts'),
('Optyk', 'shop', 'optician'),
('Sklep turystyczny', 'shop', 'outdoor'),
('Odbiór zamówień', 'shop', 'outpost'),
('Sklep z farbami', 'shop', 'paint'),
('Sklep z artykułami imprezowymi', 'shop', 'party'),
('Sklep z makaronem', 'shop', 'pasta'),
('Cukiernia', 'shop', 'pastry'),
('Lombard', 'shop', 'pawnbroker'),
('Perfumeria', 'shop', 'perfumery'),
('Sklep z środkami na szkodniki', 'shop', 'pest_control'),
('Sklep zoologiczny', 'shop', 'pet'),
('Salon pielęgnacji zwierząt', 'shop', 'pet_grooming'),
('Sklep fotograficzny', 'shop', 'photo'),
('Sklep z ceramiką', 'shop', 'pottery'),
('Sklep z tuszami do drukarek', 'shop', 'printer_ink'),
('Sklep pirotechniczny', 'shop', 'pyrotechnics'),
('Sklep radiotechniczny', 'shop', 'radiotechnics'),
('Wypożyczalnia', 'shop', 'rental'),
('Sklep nurkowy', 'shop', 'scuba_diving'),
('Sklep z owocami morza', 'shop', 'seafood'),
('Sklep z używanymi rzeczami', 'shop', 'second_hand'),
('Sklep z systemami bezpieczeństwa', 'shop', 'security'),
('Sklep krawiecki', 'shop', 'sewing'),
('Szewc', 'shop', 'shoe_repair'),
('Sklep z obuwiem', 'shop', 'shoes'),
('Sklep narciarski', 'shop', 'ski'),
('Sklep ze skuterami śnieżnymi', 'shop', 'snowmobile'),
('Sklep z przyprawami', 'shop', 'spices'),
('Sklep sportowy', 'shop', 'sports'),
('Sklep papierniczy', 'shop', 'stationery'),
('Przechowywalnia', 'shop', 'storage_rental'),
('Supermarket', 'shop', 'supermarket'),
('Sklep surfowy', 'shop', 'surf'),
('Sklep basenowy', 'shop', 'swimming_pool'),
('Krawiec', 'shop', 'tailor'),
('Studio tatuażu', 'shop', 'tattoo'),
('Herbaciarnia', 'shop', 'tea'),
('Sklep telekomunikacyjny', 'shop', 'telecommunication'),
('Kasa biletowa', 'shop', 'ticket'),
('Sklep z kafelkami', 'shop', 'tiles'),
('Wypożyczalnia narzędzi', 'shop', 'tool_hire'),
('Sklep z zabawkami', 'shop', 'toys'),
('Sklep branżowy', 'shop', 'trade'),
('Sklep z przyczepami', 'shop', 'trailer'),
('Biuro podróży', 'shop', 'travel_agency'),
('Sklep z trofeami', 'shop', 'trophy'),
('Salon ciężarówek', 'shop', 'truck'),
('Sklep z oponami', 'shop', 'tyres'),
('Sklep z odkurzaczami', 'shop', 'vacuum_cleaner'),
('Sklep z różnościami', 'shop', 'variety_store'),
('Wypożyczalnia filmów', 'shop', 'video'),
('Sklep z grami wideo', 'shop', 'video_games'),
('Sklep z zegarkami', 'shop', 'watches'),
('Sklep z wodą butelkowaną', 'shop', 'water'),
('Sklep z bronią', 'shop', 'weapons'),
('Hurtownia', 'shop', 'wholesale'),
('Sklep z roletami', 'shop', 'window_blind'),
('Sklep winiarski', 'shop', 'wine'),
('Sklep z wełną', 'shop', 'wool'),
('Apartamenty', 'tourism', 'apartment'),
('Akwarium', 'tourism', 'aquarium'),
('Dzieło sztuki', 'tourism', 'artwork'),
('Atrakcja turystyczna', 'tourism', 'attraction'),
('Pole namiotowe', 'tourism', 'camp_pitch'),
('Kemping', 'tourism', 'camp_site'),
('Kemping dla przyczep kempingowych', 'tourism', 'caravan_site'),
('Domek letniskowy', 'tourism', 'chalet'),
('Galeria', 'tourism', 'gallery'),
('Pensjonat', 'tourism', 'guest_house'),
('Hostel', 'tourism', 'hostel'),
('Hotel', 'tourism', 'hotel'),
('Informacja turystyczna', 'tourism', 'information'),
('Motel', 'tourism', 'motel'),
('Muzeum', 'tourism', 'museum'),
('Miejsce piknikowe', 'tourism', 'picnic_site'),
('Park rozrywki', 'tourism', 'theme_park'),
('Przewodnik', 'tourism', 'tours'),
('Stacja jazdy konnej', 'tourism', 'trail_riding_station'),
('pPnkt widokowy', 'tourism', 'viewpoint'),
('Chatka w dziczy', 'tourism', 'wilderness_hut'),
('Ogród zoologiczny', 'tourism', 'zoo');


--3
INSERT INTO pinwise.pin_type (id, category) VALUES 
(1, 'Firma'),
(2, 'Usługa');


--4
INSERT INTO pinwise.pin(user_id, coordinateX, coordinateY, adres, id_serwis, modification_date) 
VALUES 
((SELECT id FROM pinwise.user WHERE username='Jan1'), 21.37, 1.69, 'address1', 1, '2022-01-01'),
((SELECT id FROM pinwise.user WHERE username='Anna'), -22.36, 2.71, 'address2', 2, '2022-01-02'),
((SELECT id FROM pinwise.user WHERE username='Piotr'), 23.36, 3.72, 'address3', 3, '2022-01-03'),
((SELECT id FROM pinwise.user WHERE username='Katarzyna'), -24.36, 4.73, 'address4', 4, '2022-01-04'),
((SELECT id FROM pinwise.user WHERE username='Andrzej'), 25.36, 5.74, 'address5', 5, '2022-01-05'),
((SELECT id FROM pinwise.user WHERE username='Agnieszka'), -26.36, -6.75, 'address6', 6, '2022-01-06'),
((SELECT id FROM pinwise.user WHERE username='Tomasz'), 27.36, 7.76, 'address7', 7, '2022-01-07'),
((SELECT id FROM pinwise.user WHERE username='Ewa'), 28.36, 8.77, 'address8', 8, '2022-01-08'),
((SELECT id FROM pinwise.user WHERE username='Marek'), -29.36, 9.78, 'address9', 9, '2022-01-09'),
((SELECT id FROM pinwise.user WHERE username='Magdalena'), 30.36, -10.79, 'address10', 10, '2022-01-10'),
((SELECT id FROM pinwise.user WHERE username='Michal33'), 31.36, 11.80, 'address11', 11, '2022-01-11'),
((SELECT id FROM pinwise.user WHERE username='Dorota'), -32.36, 12.81, 'address12', 12, '2022-01-12'),
((SELECT id FROM pinwise.user WHERE username='Pawel'), 33.36, -13.82, 'address13', 13, '2022-01-13'),
((SELECT id FROM pinwise.user WHERE username='Joanna'), 34.36, 14.83, 'address14', 14, '2022-01-14'),
((SELECT id FROM pinwise.user WHERE username='Krzysztof'), -35.36, -15.84, 'address15', 15, '2022-01-15'),
((SELECT id FROM pinwise.user WHERE username='Barbara'), 36.36, 16.85, 'address16', 16, '2022-01-16'),
((SELECT id FROM pinwise.user WHERE username='Marcin'), 37.36, 17.86, 'address17', 17, '2022-01-17'),
((SELECT id FROM pinwise.user WHERE username='Monika'), 38.36, -18.87, 'address18', 18, '2022-01-18'),
((SELECT id FROM pinwise.user WHERE username='Grzegorz'), -39.36, 19.88, 'address19', 19, '2022-01-19'),
((SELECT id FROM pinwise.user WHERE username='Malgorzata'), 40.36, 20.89, 'address20', 20, '2022-01-20');



--SELECT (password = crypt('entered password', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
--SELECT (password = crypt('haslomaslo', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm';
--SELECT (password = crypt('hasłomasło', password)) AS pswmatch from pinwise.user p where p.username = 'jusernejm'; -- zwraca true
