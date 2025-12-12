-- V1__init_schema_and_seed.sql
-- Combined migration: Cities, Brands (Dacia, Hyundai, Kia, Porsche), Models, Sellers, and Voitures

-- ==========================
-- 1. Create Tables
-- ==========================

CREATE TABLE IF NOT EXISTS ville (
                                     id UUID PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
                                     slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS marque (
                                      id UUID PRIMARY KEY,
                                      nom VARCHAR(100) NOT NULL,
                                      slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS modele (
                                      id UUID PRIMARY KEY,
                                      nom VARCHAR(100) NOT NULL,
                                      slug VARCHAR(50) NOT NULL,
                                      marque_id UUID NOT NULL REFERENCES marque(id)
);

CREATE TABLE IF NOT EXISTS vendeur (
                                       id UUID PRIMARY KEY,
                                       type VARCHAR(50) NOT NULL,
                                       nom VARCHAR(100) NOT NULL,
                                       tel VARCHAR(50),
                                       email VARCHAR(100),
                                       adresse VARCHAR(200),
                                       ville_id UUID REFERENCES ville(id)
);

CREATE TABLE IF NOT EXISTS voiture (
                                       id UUID PRIMARY KEY,
                                       prix INTEGER NOT NULL,
                                       marque_id UUID NOT NULL REFERENCES marque(id),
                                       modele_id UUID NOT NULL REFERENCES modele(id),
                                       vendeur_id UUID NOT NULL REFERENCES vendeur(id),
                                       annee_mise_circulation INTEGER NOT NULL,
                                       mois_mise_circulation INTEGER NOT NULL,
                                       kilometrage INTEGER NOT NULL,
                                       ville_id UUID NOT NULL REFERENCES ville(id),
                                       ref VARCHAR(255) NOT NULL UNIQUE,
                                       type VARCHAR(50) NOT NULL,
                                       photo VARCHAR(255) NOT NULL,
                                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                       updated_at TIMESTAMP
);

-- ==========================
-- 2. Insert 15 Cities
-- ==========================

INSERT INTO ville (id, name, slug) VALUES
                                       ('11111111-1111-1111-1111-111111111111', 'Casablanca', 'casa'),
                                       ('22222222-2222-2222-2222-222222222222', 'Rabat', 'rabat'),
                                       ('33333333-3333-3333-3333-333333333333', 'Marrakech', 'marrakech'),
                                       ('44444444-4444-4444-4444-444444444444', 'Tanger', 'tanger'),
                                       ('55555555-5555-5555-5555-555555555555', 'Fes', 'fes'),
                                       ('66666666-6666-6666-6666-666666666666', 'Agadir', 'agadir'),
                                       ('77777777-7777-7777-7777-777777777777', 'Oujda', 'oujda'),
                                       ('88888888-8888-8888-8888-888888888888', 'Kenitra', 'kenitra'),
                                       ('99999999-9999-9999-9999-999999999999', 'Meknes', 'meknes'),
                                       ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tetouan', 'tetouan'),
                                       ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Safi', 'safi'),
                                       ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'El Jadida', 'eljadida'),
                                       ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Nador', 'nador'),
                                       ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Beni Mellal', 'benimellal'),
                                       ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Taza', 'taza')
ON CONFLICT (id) DO NOTHING;

-- ==========================
-- 3. Insert 4 Car Brands (Dacia, Hyundai, Kia, Porsche)
-- ==========================

INSERT INTO marque (id, nom, slug) VALUES
                                       ('55555555-eeee-5555-eeee-555555555555', 'Dacia', 'dacia'),
                                       ('22222222-bbbb-2222-bbbb-222222222222', 'Hyundai', 'hyundai'),
                                       ('33333333-cccc-3333-cccc-333333333333', 'Kia', 'kia'),
                                       ('44444444-dddd-4444-dddd-444444444444', 'Porsche', 'porsche')
ON CONFLICT (id) DO NOTHING;

-- ==========================
-- 4. Insert Models
-- ==========================

-- Dacia Models (IDs starting with 'da')
INSERT INTO modele (id, nom, slug, marque_id) VALUES
                                                  ('da111111-1111-1111-1111-111111111111', 'Logan', 'logan', '55555555-eeee-5555-eeee-555555555555'),
                                                  ('da222222-2222-2222-2222-222222222222', 'Sandero', 'sandero', '55555555-eeee-5555-eeee-555555555555'),
                                                  ('da333333-3333-3333-3333-333333333333', 'Duster', 'duster', '55555555-eeee-5555-eeee-555555555555'),
                                                  ('da444444-4444-4444-4444-444444444444', 'Dokker', 'dokker', '55555555-eeee-5555-eeee-555555555555'),
                                                  ('da555555-5555-5555-5555-555555555555', 'Spring', 'spring', '55555555-eeee-5555-eeee-555555555555')
ON CONFLICT (id) DO NOTHING;

-- Hyundai Models (IDs starting with 'b')
INSERT INTO modele (id, nom, slug, marque_id) VALUES
                                                  ('b1b1b1b1-2222-2222-2222-222222222221', 'i10', 'i10', '22222222-bbbb-2222-bbbb-222222222222'),
                                                  ('b2b2b2b2-2222-2222-2222-222222222222', 'i20', 'i20', '22222222-bbbb-2222-bbbb-222222222222'),
                                                  ('b3b3b3b3-2222-2222-2222-222222222223', 'i30', 'i30', '22222222-bbbb-2222-bbbb-222222222222'),
                                                  ('b4b4b4b4-2222-2222-2222-222222222224', 'Tucson', 'tucson', '22222222-bbbb-2222-bbbb-222222222222'),
                                                  ('b5b5b5b5-2222-2222-2222-222222222225', 'Santa Fe', 'santafe', '22222222-bbbb-2222-bbbb-222222222222')
ON CONFLICT (id) DO NOTHING;

-- Kia Models (IDs starting with 'c')
INSERT INTO modele (id, nom, slug, marque_id) VALUES
                                                  ('c1c1c1c1-3333-3333-3333-333333333331', 'Picanto', 'picanto', '33333333-cccc-3333-cccc-333333333333'),
                                                  ('c2c2c2c2-3333-3333-3333-333333333332', 'Rio', 'rio', '33333333-cccc-3333-cccc-333333333333'),
                                                  ('c3c3c3c3-3333-3333-3333-333333333333', 'Ceed', 'ceed', '33333333-cccc-3333-cccc-333333333333'),
                                                  ('c4c4c4c4-3333-3333-3333-333333333334', 'Sportage', 'sportage', '33333333-cccc-3333-cccc-333333333333'),
                                                  ('c5c5c5c5-3333-3333-3333-333333333335', 'Sorento', 'sorento', '33333333-cccc-3333-cccc-333333333333')
ON CONFLICT (id) DO NOTHING;

-- Porsche Models (IDs starting with 'd')
INSERT INTO modele (id, nom, slug, marque_id) VALUES
                                                  ('d1d1d1d1-4444-4444-4444-444444444441', '911', '911', '44444444-dddd-4444-dddd-444444444444'),
                                                  ('d2d2d2d2-4444-4444-4444-444444444442', 'Cayenne', 'cayenne', '44444444-dddd-4444-dddd-444444444444'),
                                                  ('d3d3d3d3-4444-4444-4444-444444444443', 'Panamera', 'panamera', '44444444-dddd-4444-dddd-444444444444'),
                                                  ('d4d4d4d4-4444-4444-4444-444444444444', 'Macan', 'macan', '44444444-dddd-4444-dddd-444444444444'),
                                                  ('d5d5d5d5-4444-4444-4444-444444444445', 'Taycan', 'taycan', '44444444-dddd-4444-dddd-444444444444')
ON CONFLICT (id) DO NOTHING;

-- ==========================
-- 5. Insert Sellers (Added 2 more)
-- ==========================

INSERT INTO vendeur (id, type, nom, tel, email, adresse, ville_id) VALUES
                                                                       ('e1111111-7777-7777-7777-777777777777', 'PROFESSIONAL', 'AutoMax Dealer', '+212600000000', 'dealer@automax.ma', '123 Main Street', '11111111-1111-1111-1111-111111111111'), -- Casablanca
                                                                       ('e2222222-8888-8888-8888-888888888888', 'INDIVIDUAL', 'Ahmed Sellami', '+212600000001', 'ahmed@example.com', '456 Secondary St', '22222222-2222-2222-2222-222222222222'), -- Rabat
                                                                       ('e3333333-9999-9999-9999-999999999999', 'PROFESSIONAL', 'Global Cars', '+212600000002', 'contact@globalcars.ma', '789 Industrial Zone', '33333333-3333-3333-3333-333333333333'), -- Marrakech
                                                                       ('e4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'INDIVIDUAL', 'Fatima Benali', '+212600000003', 'fatima@example.com', '321 Ocean View', '44444444-4444-4444-4444-444444444444') -- Tanger
ON CONFLICT (id) DO NOTHING;

-- ==========================
-- 6. Insert Voitures
-- ==========================

-- Car 1: Dacia Logan (Casablanca, Professional - AutoMax)
INSERT INTO voiture (id, prix, marque_id, modele_id, vendeur_id, ville_id, annee_mise_circulation, mois_mise_circulation, kilometrage, ref, type, photo, created_at)
VALUES (
           'f1f1f1f1-1111-1111-1111-111111111111',
           95000,
           '55555555-eeee-5555-eeee-555555555555', -- Dacia
           'da111111-1111-1111-1111-111111111111', -- Logan
           'e1111111-7777-7777-7777-777777777777', -- AutoMax
           '11111111-1111-1111-1111-111111111111', -- Casa
           2021,
           3,
           40000,
           'REF-DACIA-01',
           'PUBLISHED',
           'dacia.png',
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Car 2: Hyundai Tucson (Rabat, Individual - Ahmed)
INSERT INTO voiture (id, prix, marque_id, modele_id, vendeur_id, ville_id, annee_mise_circulation, mois_mise_circulation, kilometrage, ref, type, photo, created_at)
VALUES (
           'f2f2f2f2-2222-2222-2222-222222222222',
           185000,
           '22222222-bbbb-2222-bbbb-222222222222', -- Hyundai
           'b4b4b4b4-2222-2222-2222-222222222224', -- Tucson
           'e2222222-8888-8888-8888-888888888888', -- Ahmed
           '22222222-2222-2222-2222-222222222222', -- Rabat
           2019,
           11,
           85000,
           'REF-HYUN-02',
           'PUBLISHED',
           'hyundai.png',
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Car 3: Kia Sportage (Marrakech, Professional - Global Cars)
INSERT INTO voiture (id, prix, marque_id, modele_id, vendeur_id, ville_id, annee_mise_circulation, mois_mise_circulation, kilometrage, ref, type, photo, created_at)
VALUES (
           'f3f3f3f3-3333-3333-3333-333333333333',
           270000,
           '33333333-cccc-3333-cccc-333333333333', -- Kia
           'c4c4c4c4-3333-3333-3333-333333333334', -- Sportage
           'e3333333-9999-9999-9999-999999999999', -- Global Cars
           '33333333-3333-3333-3333-333333333333', -- Marrakech
           2023,
           6,
           12000,
           'REF-KIA-03',
           'PUBLISHED',
           'kia.png',
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Car 4: Porsche Macan (Tanger, Individual - Fatima)
INSERT INTO voiture (id, prix, marque_id, modele_id, vendeur_id, ville_id, annee_mise_circulation, mois_mise_circulation, kilometrage, ref, type, photo, created_at)
VALUES (
           'f4f4f4f4-4444-4444-4444-444444444444',
           550000,
           '44444444-dddd-4444-dddd-444444444444', -- Porsche
           'd4d4d4d4-4444-4444-4444-444444444444', -- Macan
           'e4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', -- Fatima
           '44444444-4444-4444-4444-444444444444', -- Tanger
           2020,
           1,
           30000,
           'REF-POR-04',
           'PUBLISHED',
           'porsche.png',
           NOW()
       ) ON CONFLICT (id) DO NOTHING;