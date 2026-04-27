CREATE DATABASE IF NOT EXISTS universal_library;
USE universal_library;

CREATE TABLE IF NOT EXISTS person (
    personId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phoneNumber VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS librarian (
    librarianId INT AUTO_INCREMENT PRIMARY KEY,
    personId INT,
    role VARCHAR(50) DEFAULT 'Admin',
    FOREIGN KEY (personId) REFERENCES person(personId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS member (
    memberId INT AUTO_INCREMENT PRIMARY KEY,
    personId INT,
    role VARCHAR(50) DEFAULT 'User',
    FOREIGN KEY (personId) REFERENCES person(personId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS category (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS publisher (
    publisherId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS book (
    bookId INT AUTO_INCREMENT PRIMARY KEY,
    ISBN VARCHAR(50),
    title VARCHAR(200),
    author VARCHAR(100),
    publicationYear INT,
    status VARCHAR(50) DEFAULT 'available',
    quantity INT DEFAULT 1,
    categoryId INT,
    publisherId INT,
    FOREIGN KEY (categoryId) REFERENCES category(categoryId),
    FOREIGN KEY (publisherId) REFERENCES publisher(publisherId)
);

CREATE TABLE IF NOT EXISTS loan (
    loanId INT AUTO_INCREMENT PRIMARY KEY,
    loanDate DATE,
    dueDate DATE,
    returnDate DATE,
    memberId INT,
    bookId INT,
    FOREIGN KEY (memberId) REFERENCES member(memberId),
    FOREIGN KEY (bookId) REFERENCES book(bookId)
);

CREATE TABLE IF NOT EXISTS reservation (
    reservationId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT,
    bookId INT,
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (memberId) REFERENCES member(memberId),
    FOREIGN KEY (bookId) REFERENCES book(bookId)
);

CREATE TABLE IF NOT EXISTS notification (
    notificationId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT,
    message TEXT,
    FOREIGN KEY (memberId) REFERENCES member(memberId)
);

INSERT INTO person (name, lastname, email, password, phoneNumber) VALUES
('Admin', 'Library', 'admin@library.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0600000000');

INSERT INTO librarian (personId, role) VALUES (1, 'Admin');

INSERT INTO category (categoryName) VALUES ('Fiction'), ('Science'), ('History');
INSERT INTO publisher (name) VALUES ('Penguin'), ('Oxford Press');
INSERT INTO book (ISBN, title, author, publicationYear, status, quantity, categoryId, publisherId) VALUES
('978-1', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'available', 5, 1, 1),
('978-2', 'A Brief History of Time', 'Stephen Hawking', 1988, 'available', 3, 2, 2);
