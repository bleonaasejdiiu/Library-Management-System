//trashegohet nga personi kjo klase 

const Person = require('./Person');

class Librarian extends Person {
    constructor(id, name, lastname, email, password, phoneNumber, librarianId, hireDate, role) {
        super(id, name, lastname, email, password, phoneNumber); // Thirr prindin
        this.librarianId = librarianId;
        this.hireDate = hireDate;
        this.role = role; 
    }
}

module.exports = Librarian;