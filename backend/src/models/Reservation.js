class Reservation {
    constructor(id, reservationDate, expirationDate, memberId, bookId) {
        this.id = id;
        this.reservationDate = reservationDate;
        this.expirationDate = expirationDate;
        this.memberId = memberId;
        this.bookId = bookId;
    }
}

module.exports = Reservation;