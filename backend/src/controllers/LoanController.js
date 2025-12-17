const loanRepository = require('../repositories/LoanRepository');

class LoanController {
    // 1. Merr të gjitha huazimet
    async getLoans(req, res) {
        try {
            const loans = await loanRepository.findAll();
            res.json(loans);
        } catch (error) {
            console.error("Gabim në marrjen e huazimeve:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // 2. Kthe librin
    async returnBook(req, res) {
        try {
            const { id } = req.params;
            await loanRepository.returnBook(id);
            res.json({ message: 'Libri u kthye me sukses!' });
        } catch (error) {
            console.error("Gabim në kthimin e librit:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LoanController();