const Person = require('./Person');

class Member extends Person {
    constructor(id, name, lastname, email, password, phoneNumber, memberId, memberStatus) {
        super(id, name, lastname, email, password, phoneNumber); // Thirr prindin
        this.memberId = memberId;
        this.memberStatus = memberStatus || 'Active';
    }
}

module.exports = Member;