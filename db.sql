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
