-- Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Borrowers Table
CREATE TABLE Borrowers (
    borrower_id SERIAL PRIMARY KEY,
    created_by INT REFERENCES Users(user_id),
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    city_of_birth VARCHAR(100) NOT NULL,
    state_of_birth VARCHAR(100) NOT NULL,
    country_of_birth VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    CONSTRAINT fk_borrower_user FOREIGN KEY (created_by) REFERENCES Users(user_id),
    CONSTRAINT chk_email CHECK (position('@' in email) > 0)
);

-- Contacts Table
CREATE TABLE Contacts (
    contact_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES Borrowers(borrower_id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    CONSTRAINT fk_contact_borrower FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE
);

-- Addresses Table
CREATE TABLE Addresses (
    address_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES Borrowers(borrower_id) ON DELETE CASCADE,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    is_property_owner BOOLEAN NOT NULL,
    CONSTRAINT fk_address_borrower FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE
);

-- ReferencePersons Table
CREATE TABLE ReferencePersons (
    reference_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES Borrowers(borrower_id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    relation_to_borrower VARCHAR(50) NOT NULL,
    CONSTRAINT fk_reference_borrower FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE
);

-- Loans Table
CREATE TABLE Loans (
    loan_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES Borrowers(borrower_id) ON DELETE CASCADE,
    amount_requested DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    mortgage_length INT NOT NULL,
    reason TEXT NOT NULL,
    approval_date DATE NOT NULL,
    total_interest DECIMAL(15, 2) NOT NULL,
    total_loan DECIMAL(15, 2) NOT NULL,
    payment_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_loan_borrower FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES Loans(loan_id) ON DELETE CASCADE,
    payment_date DATE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    month_reference DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_loan FOREIGN KEY (loan_id) REFERENCES Loans(loan_id) ON DELETE CASCADE
);



-- New Db Schema start here

CREATE SCHEMA IF NOT EXISTS loan;

CREATE SEQUENCE loan.address_address_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.borrower_borrower_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.contact_contact_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.loan_loan_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.loan_status_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.payment_method_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.payment_payment_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.pledge_pledge_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.pledge_status_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.reference_person_reference_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.role_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.token_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE loan.user_user_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE  TABLE loan.loan_status ( 
	id                   integer DEFAULT nextval('loan.loan_status_id_seq'::regclass) NOT NULL  ,
	"value"              varchar(255)  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	CONSTRAINT loan_status_pkey PRIMARY KEY ( id )
 );

CREATE  TABLE loan.payment_method ( 
	id                   integer DEFAULT nextval('loan.payment_method_id_seq'::regclass) NOT NULL  ,
	"value"              varchar(255)  NOT NULL  ,
	"createdAt"          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	"updatedAt"          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT payment_method_pkey PRIMARY KEY ( id ),
	CONSTRAINT payment_method_method_name_key UNIQUE ( "value" ) 
 );

CREATE  TABLE loan.pledge_status ( 
	id                   integer DEFAULT nextval('loan.pledge_status_id_seq'::regclass) NOT NULL  ,
	"value"              varchar(255)  NOT NULL  ,
	CONSTRAINT pledge_status_pkey PRIMARY KEY ( id )
 );

CREATE  TABLE loan."role" ( 
	id                   integer DEFAULT nextval('loan.role_id_seq'::regclass) NOT NULL  ,
	"value"              varchar(255)  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	CONSTRAINT role_pkey PRIMARY KEY ( id ),
	 
 );

CREATE  TABLE loan."user" ( 
	user_id              integer DEFAULT nextval('loan.user_user_id_seq'::regclass) NOT NULL  ,
	username             varchar(255)  NOT NULL  ,
	"password"           varchar(255)  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	role_id              integer  NOT NULL  ,
	CONSTRAINT user_pkey PRIMARY KEY ( user_id ),
	CONSTRAINT user_username_key78 UNIQUE ( username ) ,

	CONSTRAINT user_role_id_fkey FOREIGN KEY ( role_id ) REFERENCES loan."role"( id )   
 );

CREATE  TABLE loan.borrower ( 
	borrower_id          integer DEFAULT nextval('loan.borrower_borrower_id_seq'::regclass) NOT NULL  ,
	last_name            varchar(255)  NOT NULL  ,
	first_name           varchar(255)  NOT NULL  ,
	birthdate            date  NOT NULL  ,
	city_of_birth        varchar(255)  NOT NULL  ,
	state_of_birth       varchar(255)  NOT NULL  ,
	country_of_birth     varchar(255)  NOT NULL  ,
	email                varchar(255)  NOT NULL  ,
	created_by           integer  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	gender               varchar(15)    ,
	ninu                 varchar(15)    ,
	nif                  varchar(15)    ,
	CONSTRAINT borrower_pkey PRIMARY KEY ( borrower_id ),
	CONSTRAINT unique_nif UNIQUE ( nif ) ,
	CONSTRAINT unique_ninu UNIQUE ( ninu ) ,
	CONSTRAINT borrower_created_by_fkey FOREIGN KEY ( created_by ) REFERENCES loan."user"( user_id )   
 );

CREATE  TABLE loan.contact ( 
	contact_id           integer DEFAULT nextval('loan.contact_contact_id_seq'::regclass) NOT NULL  ,
	phone_number         varchar(255)  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	borrower_id          integer  NOT NULL  ,
	CONSTRAINT contact_pkey PRIMARY KEY ( contact_id ),
	CONSTRAINT contact_borrower_id_fkey FOREIGN KEY ( borrower_id ) REFERENCES loan.borrower( borrower_id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE loan.loan ( 
	loan_id              integer DEFAULT nextval('loan.loan_loan_id_seq'::regclass) NOT NULL  ,
	borrower_id          integer  NOT NULL  ,
	amount_requested     numeric(15,2)  NOT NULL  ,
	interest_rate        numeric(5,2)  NOT NULL  ,
	mortgage_length      integer  NOT NULL  ,
	reason               text  NOT NULL  ,
	approval_date        timestamp  NOT NULL  ,
	total_interest       numeric(15,2)  NOT NULL  ,
	total_loan           numeric(15,2)  NOT NULL  ,
	payment_end_date     timestamp  NOT NULL  ,
	loan_status_id       integer DEFAULT 1 NOT NULL  ,
	"createdAt"          timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	"updatedAt"          timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT loan_pkey PRIMARY KEY ( loan_id ),
	CONSTRAINT loan_borrower_id_fkey FOREIGN KEY ( borrower_id ) REFERENCES loan.borrower( borrower_id )   ,
	CONSTRAINT loan_loan_status_id_fkey FOREIGN KEY ( loan_status_id ) REFERENCES loan.loan_status( id )   
 );

CREATE INDEX idx_loan_borrower_id ON loan.loan USING  btree ( borrower_id );

CREATE INDEX idx_loan_loan_status_id ON loan.loan USING  btree ( loan_status_id );

CREATE  TABLE loan.payment ( 
	payment_id           integer DEFAULT nextval('loan.payment_payment_id_seq'::regclass) NOT NULL  ,
	loan_id              integer  NOT NULL  ,
	payment_date         date  NOT NULL  ,
	amount               numeric(15,2)  NOT NULL  ,
	month_reference      date  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	payment_method_id    integer  NOT NULL  ,
	CONSTRAINT payment_pkey PRIMARY KEY ( payment_id ),
	CONSTRAINT payment_loan_id_fkey FOREIGN KEY ( loan_id ) REFERENCES loan.loan( loan_id )   ,
	CONSTRAINT payment_payment_method_fkey FOREIGN KEY ( payment_method_id ) REFERENCES loan.payment_method( id )   
 );

CREATE  TABLE loan.pledge ( 
	pledge_id            integer DEFAULT nextval('loan.pledge_pledge_id_seq'::regclass) NOT NULL  ,
	pledge_value         numeric(15,2)  NOT NULL  ,
	"location"           varchar(255)  NOT NULL  ,
	pledge_text          text    ,
	loan_id              integer  NOT NULL  ,
	note                 text    ,
	pledge_status_id     integer  NOT NULL  ,
	"createdAt"          timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	"updatedAt"          timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pledge_pkey PRIMARY KEY ( pledge_id ),
	CONSTRAINT pledge_loan_id_fkey FOREIGN KEY ( loan_id ) REFERENCES loan.loan( loan_id ) ON DELETE CASCADE  ,
	CONSTRAINT pledge_pledge_status_id_fkey FOREIGN KEY ( pledge_status_id ) REFERENCES loan.pledge_status( id )   
 );

CREATE  TABLE loan.reference_person ( 
	reference_id         integer DEFAULT nextval('loan.reference_person_reference_id_seq'::regclass) NOT NULL  ,
	first_name           varchar(255)  NOT NULL  ,
	last_name            varchar(255)  NOT NULL  ,
	address              varchar(255)  NOT NULL  ,
	phone_number         varchar(255)  NOT NULL  ,
	relation_to_borrower varchar(255)  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	borrower_id          integer  NOT NULL  ,
	loan_id              integer    ,
	CONSTRAINT reference_person_pkey PRIMARY KEY ( reference_id ),
	CONSTRAINT loan_reference_person_id_fkey FOREIGN KEY ( loan_id ) REFERENCES loan.loan( loan_id )   ,
	CONSTRAINT reference_person_borrower_id_fkey FOREIGN KEY ( borrower_id ) REFERENCES loan.borrower( borrower_id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE loan.token ( 
	id                   integer DEFAULT nextval('loan.token_id_seq'::regclass) NOT NULL  ,
	token                varchar(255)  NOT NULL  ,
	refresh_token        varchar(255)  NOT NULL  ,
	user_id              integer    ,
	"createdAt"          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	"updatedAt"          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT token_pkey PRIMARY KEY ( id ),
	CONSTRAINT token_user_id_fkey FOREIGN KEY ( user_id ) REFERENCES loan."user"( user_id ) ON DELETE CASCADE  
 );

CREATE  TABLE loan.address ( 
	address_id           integer DEFAULT nextval('loan.address_address_id_seq'::regclass) NOT NULL  ,
	street               varchar(255)  NOT NULL  ,
	city                 varchar(255)  NOT NULL  ,
	"state"              varchar(255)  NOT NULL  ,
	is_property_owner    boolean  NOT NULL  ,
	"createdAt"          timestamptz  NOT NULL  ,
	"updatedAt"          timestamptz  NOT NULL  ,
	borrower_id          integer  NOT NULL  ,
	CONSTRAINT address_pkey PRIMARY KEY ( address_id ),
	CONSTRAINT address_borrower_id_fkey FOREIGN KEY ( borrower_id ) REFERENCES loan.borrower( borrower_id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

INSERT INTO loan.loan_status( id, "value", "createdAt", "updatedAt" ) VALUES ( 1, 'active', '2023-12-26 12:57:45 PM', '2023-12-26 12:57:45 PM');
INSERT INTO loan.loan_status( id, "value", "createdAt", "updatedAt" ) VALUES ( 3, 'Closed', '2023-12-26 01:23:34 PM', '2023-12-26 01:23:34 PM');
INSERT INTO loan.loan_status( id, "value", "createdAt", "updatedAt" ) VALUES ( 2, 'inactive', '2023-12-26 01:23:34 PM', '2023-12-26 01:23:34 PM');
INSERT INTO loan.payment_method( id, "value", "createdAt", "updatedAt" ) VALUES ( 1, 'Cash', '2024-01-01 08:10:31 AM', '2024-01-01 08:10:31 AM');
INSERT INTO loan.payment_method( id, "value", "createdAt", "updatedAt" ) VALUES ( 2, 'MonCash', '2024-01-01 08:10:31 AM', '2024-01-01 08:10:31 AM');
INSERT INTO loan.payment_method( id, "value", "createdAt", "updatedAt" ) VALUES ( 3, 'Depot Bank', '2024-01-01 08:10:31 AM', '2024-01-01 08:10:31 AM');
INSERT INTO loan.pledge_status( id, "value" ) VALUES ( 1, 'Blocked');
INSERT INTO loan."role"( id, "value", "createdAt", "updatedAt" ) VALUES ( 1, 'admin', '2023-12-26 11:20:40 AM', '2023-12-26 11:20:40 AM');
INSERT INTO loan."user"( user_id, username, "password", "createdAt", "updatedAt", role_id ) VALUES ( 35, 'fritz', 'legal', '2023-12-26 11:47:28 AM', '2023-12-26 11:47:28 AM', 1);
INSERT INTO loan."user"( user_id, username, "password", "createdAt", "updatedAt", role_id ) VALUES ( 37, 'elena', 'legal', '2023-12-26 02:32:14 PM', '2023-12-26 02:32:14 PM', 1);
INSERT INTO loan."user"( user_id, username, "password", "createdAt", "updatedAt", role_id ) VALUES ( 38, 'manoah', '$2b$10$RjzaJt3zx9PWLEvQb8DdZ.bRJdeLdWNUYT.mA..3arA81eoVtIXMa', '2023-12-29 05:48:24 PM', '2023-12-29 05:48:24 PM', 1);
INSERT INTO loan."user"( user_id, username, "password", "createdAt", "updatedAt", role_id ) VALUES ( 39, 'ravel', '$2b$10$r5PB69Jm3QGVYn3mCVnPpebQCgmDXrjwabLvhWEsvMDC0Z76VcvcW', '2024-01-08 08:22:29 PM', '2024-01-08 08:22:29 PM', 1);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 4, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrigo1@abc.com', 35, '2023-12-26 02:32:29 PM', '2023-12-26 02:32:29 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 6, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrigo@abc.com', 35, '2023-12-26 02:33:50 PM', '2023-12-26 02:33:50 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 7, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig2@abc.com', 35, '2023-12-26 02:34:04 PM', '2023-12-26 02:34:04 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 10, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig22@abc.com', 35, '2023-12-26 02:35:20 PM', '2023-12-26 02:35:20 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 12, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig224@abc.com', 35, '2023-12-26 02:36:57 PM', '2023-12-26 02:36:57 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 14, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig2243@abc.com', 35, '2023-12-26 02:39:34 PM', '2023-12-26 02:39:34 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 16, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig22243@abc.com', 35, '2023-12-26 02:41:05 PM', '2023-12-26 02:41:05 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 18, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig232243@abc.com', 35, '2023-12-26 02:42:20 PM', '2023-12-26 02:42:20 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 19, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrig2321243@abc.com', 35, '2023-12-26 02:44:33 PM', '2023-12-26 02:44:33 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 20, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrigw2321243@abc.com', 35, '2023-12-26 02:45:18 PM', '2023-12-26 02:45:18 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 21, 'Adam', 'Rodrigue', '1999-11-11', '', '', '', 'arogrigq2321243@abc.com', 35, '2023-12-26 02:48:34 PM', '2023-12-26 02:48:34 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 22, 'Jean', 'Rodrigue', '1999-11-11', '', '', '', 'arogrop@abc.com', 35, '2023-12-26 02:57:40 PM', '2023-12-26 02:57:40 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 24, 'Brignoles', 'Manoah', '1999-11-11', '', '', '', 'manoahb@abc.com', 35, '2023-12-30 05:14:04 PM', '2023-12-30 05:14:04 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 26, 'Brignoles', 'Manoah', '1999-11-11', '', '', '', 'manoah@abc.com', 35, '2023-12-30 05:15:10 PM', '2023-12-30 05:15:10 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 27, 'Brignoles', 'Manoah', '1999-11-11', '', '', '', 'manoahty@abc.com', 35, '2023-12-30 05:16:34 PM', '2023-12-30 05:16:34 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 28, 'jeune', 'Semerite', '1999-11-11', '', '', '', 'semeritey@abc.com', 35, '2023-12-30 05:22:13 PM', '2023-12-30 05:22:13 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 29, 'jeune', 'Fritz', '1999-11-11', '', '', '', 'fritz@abc.com', 35, '2023-12-30 05:23:01 PM', '2023-12-30 05:23:01 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 30, 'jeune', 'Schella', '1999-11-11', '', '', '', 'schellaj@abc.com', 35, '2023-12-30 05:33:05 PM', '2023-12-30 05:33:05 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 31, 'Jeune', 'Reina', '1999-11-11', '', '', '', 'Leila@abc.com', 35, '2023-12-30 05:45:44 PM', '2023-12-30 05:45:44 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 33, 'Jeune', 'Reina', '1999-11-11', '', '', '', 'Leila2@abc.com', 35, '2023-12-30 05:46:23 PM', '2023-12-30 05:46:23 PM', null, null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 34, 'Jean', 'Francois', '1999-11-12', '', '', '', 'jeanfrancois@abc.com', 35, '2024-01-08 08:24:21 PM', '2024-01-08 08:24:21 PM', 'M', null, null);
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 36, 'Jean', 'Francois', '1999-11-12', '', '', '', 'jeanfrancois18@abc.com', 35, '2024-01-16 05:50:38 PM', '2024-01-16 05:50:38 PM', 'M', '1020230200', '001-002-003-4');
INSERT INTO loan.borrower( borrower_id, last_name, first_name, birthdate, city_of_birth, state_of_birth, country_of_birth, email, created_by, "createdAt", "updatedAt", gender, ninu, nif ) VALUES ( 41, 'Jean', 'Francois', '1999-11-12', '', '', '', 'jeanfrancois18@abc.com', 35, '2024-01-16 06:03:34 PM', '2024-01-16 06:03:34 PM', 'M', '1020230201', '001-002-003-5');
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 2, '50932020000', '2023-12-26 02:48:35 PM', '2023-12-26 02:48:35 PM', 21);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 3, '50932020000', '2023-12-26 02:57:40 PM', '2023-12-26 02:57:40 PM', 22);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 4, '50932020000', '2023-12-30 05:22:13 PM', '2023-12-30 05:22:13 PM', 28);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 5, '50932020000', '2023-12-30 05:23:01 PM', '2023-12-30 05:23:01 PM', 29);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 6, '50932020000', '2023-12-30 05:33:05 PM', '2023-12-30 05:33:05 PM', 30);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 7, '50932020000', '2023-12-30 05:46:23 PM', '2023-12-30 05:46:23 PM', 33);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 8, '50932020000', '2024-01-08 08:24:21 PM', '2024-01-08 08:24:21 PM', 34);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 9, '50932020000', '2024-01-16 05:50:38 PM', '2024-01-16 05:50:38 PM', 36);
INSERT INTO loan.contact( contact_id, phone_number, "createdAt", "updatedAt", borrower_id ) VALUES ( 10, '50932020000', '2024-01-16 06:03:34 PM', '2024-01-16 06:03:34 PM', 41);
INSERT INTO loan.loan( loan_id, borrower_id, amount_requested, interest_rate, mortgage_length, reason, approval_date, total_interest, total_loan, payment_end_date, loan_status_id, "createdAt", "updatedAt" ) VALUES ( 3, 22, 100, 2.10, 24, 'Achat de voiture.', '2023-12-26 12:00:00 AM', 111, 1111, '2023-12-26 12:00:00 AM', 1, '2023-12-30 06:40:06 AM', '2023-12-30 06:40:06 AM');
INSERT INTO loan.loan( loan_id, borrower_id, amount_requested, interest_rate, mortgage_length, reason, approval_date, total_interest, total_loan, payment_end_date, loan_status_id, "createdAt", "updatedAt" ) VALUES ( 4, 30, 100, 2.10, 24, 'Achat de voiture.', '2023-12-26 12:00:00 AM', 111, 1111, '2023-12-26 12:00:00 AM', 3, '2024-01-01 06:55:25 AM', '2024-01-01 06:55:25 AM');
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 1, 4, '2023-12-31', 200, '2023-12-31', '2024-01-01 08:18:25 AM', '2024-01-01 08:18:25 AM', 1);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 2, 4, '2024-01-31', 200, '2024-01-31', '2024-01-01 08:18:44 AM', '2024-01-01 08:18:44 AM', 1);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 3, 4, '2024-02-29', 200, '2024-02-29', '2024-01-01 08:18:55 AM', '2024-01-01 08:18:55 AM', 1);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 4, 4, '2024-03-31', 200, '2024-03-31', '2024-01-01 08:19:08 AM', '2024-01-01 08:19:08 AM', 1);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 5, 4, '2024-04-30', 200, '2024-04-30', '2024-01-01 08:19:22 AM', '2024-01-01 08:19:22 AM', 2);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 6, 4, '2024-02-01', 200, '2024-02-01', '2024-01-08 08:51:54 AM', '2024-01-08 08:51:54 AM', 1);
INSERT INTO loan.payment( payment_id, loan_id, payment_date, amount, month_reference, "createdAt", "updatedAt", payment_method_id ) VALUES ( 7, 4, '2024-03-01', 200, '2024-03-01', '2024-01-08 06:11:49 PM', '2024-01-08 06:11:49 PM', 1);
INSERT INTO loan.pledge( pledge_id, pledge_value, "location", pledge_text, loan_id, note, pledge_status_id, "createdAt", "updatedAt" ) VALUES ( 1, 20000, 'Eau chaude, no 17', 'An House', 3, 'au nom de Bamboch', 1, '2023-12-30 09:56:46 PM', '2023-12-30 09:59:01 PM');
INSERT INTO loan.pledge( pledge_id, pledge_value, "location", pledge_text, loan_id, note, pledge_status_id, "createdAt", "updatedAt" ) VALUES ( 2, 12000, 'Eau chaude', 'a land ', 3, 'au nom du client', 1, '2023-12-30 10:01:14 PM', '2023-12-30 10:01:14 PM');
INSERT INTO loan.pledge( pledge_id, pledge_value, "location", pledge_text, loan_id, note, pledge_status_id, "createdAt", "updatedAt" ) VALUES ( 3, 12000, 'Eau chaude', 'An House', 4, 'au nom de Bamboch', 1, '2024-01-01 02:44:45 PM', '2024-01-01 02:44:45 PM');
INSERT INTO loan.reference_person( reference_id, first_name, last_name, address, phone_number, relation_to_borrower, "createdAt", "updatedAt", borrower_id, loan_id ) VALUES ( 1, 'Fritz', 'Jeune', 'eau chaude', '50932000000', 'Amis', '2024-01-01 11:28:11 AM', '2024-01-01 11:28:11 AM', 30, 4);
INSERT INTO loan.reference_person( reference_id, first_name, last_name, address, phone_number, relation_to_borrower, "createdAt", "updatedAt", borrower_id, loan_id ) VALUES ( 2, 'Schella', 'Jeune', 'eau chaude', '50932000000', 'Amis', '2024-01-01 11:35:29 AM', '2024-01-01 11:35:29 AM', 30, 4);
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQxMzY3OTAsImV4cCI6MTcwNDE0MDM5MH0.tbjnQSh7ouRP2L7pXs-bxhZ-R_Ch2GI8x7neXi59CmI', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQxMzY3OTAsImV4cCI6MTcwNDc0MTU5MH0.QsIdVwIyQRwLRCkXhs1ULuMWRqAhSrcO5J-xRd0Hlkk', 38, '2024-01-01 07:19:50 PM', '2024-01-01 07:19:50 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQxNDg5OTEsImV4cCI6MTcwNDE1MjU5MX0.voJLmsv3X67ln6Gq-5JLR5Al3BQaLbLOc3YqwCx6w3Q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQxNDg5OTEsImV4cCI6MTcwNDc1Mzc5MX0.gVSvhWMFwwINsnHF-4iSuKQeM_FpItDo88XqQ0u-d3k', 38, '2024-01-01 10:43:11 PM', '2024-01-01 10:43:11 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ2MjY5MjgsImV4cCI6MTcwNDYzMDUyOH0.ubrAuCD7Piq8WFKeZXQwrwNPlT0Yxjfj8qtT8mXSnn0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ2MjY5MjgsImV4cCI6MTcwNTIzMTcyOH0.f1d1sokDJrmWzmSCNiV6kQ7x4YQRx5yOvP1bI1izeuc', 38, '2024-01-07 11:28:48 AM', '2024-01-07 11:28:48 AM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3MjE3MzIsImV4cCI6MTcwNDcyNTMzMn0.O4VaWgzv76S7rmfAj2J0d32PUvPytKZJf3I5_zyhY0g', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3MjE3MzIsImV4cCI6MTcwNTMyNjUzMn0.tX3s2Z2vdxzPbo8KfHP171KSe0lSCWYh9tcSJo3MCLE', 38, '2024-01-08 01:48:52 PM', '2024-01-08 01:48:52 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTE5MDQsImV4cCI6MTcwNDc1NTUwNH0.G4sE53JQmzD4k8z9RAUpvwoJ1f57ZEU1q5KKowY5Dac', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTE5MDQsImV4cCI6MTcwNTM1NjcwNH0.7Ia4W8HjGcL-tH9byvVgUSUne_Ewj2X_ZCRTRg_p7e0', 38, '2024-01-08 10:11:44 PM', '2024-01-08 10:11:44 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTMzMTMsImV4cCI6MTcwNDc1NjkxM30.UxbJUH9jjjj4Ir8wzHVyJq0cThcd1k_zEMrMOw36I7c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTMzMTMsImV4cCI6MTcwNTM1ODExM30.taY3TZht2z3I8is-6v2H-DyJb3MQwNMj61G1sKbmEuk', 38, '2024-01-08 10:35:13 PM', '2024-01-08 10:35:13 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTMzMTcsImV4cCI6MTcwNDc1NjkxN30.PdWzJXYw9w13O3aJvKEQMvtDBxcTO_wCLX2IcjNxToM', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTMzMTcsImV4cCI6MTcwNTM1ODExN30.12t6IFKFwm6SVKfIL_tAABGJdnL-8Yv48-8xszhNPJE', 38, '2024-01-08 10:35:17 PM', '2024-01-08 10:35:17 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTczNjAsImV4cCI6MTcwNDc2MDk2MH0.Xa1b5ljrt5YTo8Qr4FpEDObQQBTf3aRujkuw940FOTw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTczNjAsImV4cCI6MTcwNTM2MjE2MH0.XNxUPZ5kiUdDqbiSTAsusapZyOkpsvns4vSqUEM3A5Y', 38, '2024-01-08 11:42:40 PM', '2024-01-08 11:42:40 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTczNjgsImV4cCI6MTcwNDc2MDk2OH0.bn63jwZG1uxiZld8sMSt0zuqrM-Yy2Ulh_DneKaF-GA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NTczNjgsImV4cCI6MTcwNTM2MjE2OH0.mYEP0Ofwu9l7NYUv192L_9wfrVw2iYEpnc07MaD2h5c', 38, '2024-01-08 11:42:48 PM', '2024-01-08 11:42:48 PM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NjMzODAsImV4cCI6MTcwNDc2Njk4MH0.go_yzy2YDpbdzBXiI_euzqN7QjvjOAdlJJVt0tEVYCs', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDQ3NjMzODAsImV4cCI6MTcwNTM2ODE4MH0.hWXnNAr9SSGCXK8UrW_d9gZTj5YzarRtnGlCm_EQrTc', 38, '2024-01-09 01:23:00 AM', '2024-01-09 01:23:00 AM');
INSERT INTO loan.token( id, token, refresh_token, user_id, "createdAt", "updatedAt" ) VALUES ( 41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDU0NDU0MTQsImV4cCI6MTcwNTQ0OTAxNH0.5g5ps84b2wn0DPLDAbVjLB_15RgFg71rrdPkozxPsVg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM4LCJpYXQiOjE3MDU0NDU0MTQsImV4cCI6MTcwNjA1MDIxNH0.ffdv44HaF8VNd_Ba0d6nGf6EmoLSRzTkGMINN6nSZm8', 38, '2024-01-16 10:50:14 PM', '2024-01-16 10:50:14 PM');
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 4, '', '', '', false, '2023-12-26 02:48:34 PM', '2023-12-26 02:48:34 PM', 21);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 5, '', '', '', false, '2023-12-26 02:57:40 PM', '2023-12-26 02:57:40 PM', 22);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 6, '', '', '', false, '2023-12-30 05:14:04 PM', '2023-12-30 05:14:04 PM', 24);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 7, 'eau chaude', '', '', false, '2023-12-30 05:15:10 PM', '2023-12-30 05:15:10 PM', 26);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 8, 'eau chaude', '', '', false, '2023-12-30 05:16:34 PM', '2023-12-30 05:16:34 PM', 27);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 9, 'eau chaude', '', '', false, '2023-12-30 05:22:13 PM', '2023-12-30 05:22:13 PM', 28);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 10, 'eau chaude', '', '', false, '2023-12-30 05:23:01 PM', '2023-12-30 05:23:01 PM', 29);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 11, 'eau chaude', '', '', false, '2023-12-30 05:33:05 PM', '2023-12-30 05:33:05 PM', 30);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 12, 'Eau chaune', '', '', false, '2023-12-30 05:45:44 PM', '2023-12-30 05:45:44 PM', 31);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 13, 'Eau chaune', '', '', false, '2023-12-30 05:46:23 PM', '2023-12-30 05:46:23 PM', 33);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 14, '', '', '', false, '2024-01-08 08:24:21 PM', '2024-01-08 08:24:21 PM', 34);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 15, '', '', '', false, '2024-01-16 05:50:38 PM', '2024-01-16 05:50:38 PM', 36);
INSERT INTO loan.address( address_id, street, city, "state", is_property_owner, "createdAt", "updatedAt", borrower_id ) VALUES ( 16, '', '', '', false, '2024-01-16 06:03:34 PM', '2024-01-16 06:03:34 PM', 41);