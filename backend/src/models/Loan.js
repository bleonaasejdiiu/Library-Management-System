class Loan {
    constructor(id, loanDate, dueDate, returnDate, memberId, bookId) {
        this.id = id;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.memberId = memberId;
        this.bookId = bookId;
    }
}

module.exports = Loan;