const bookService = require('../services/BookService');

class BookController {
    async getBooks(req, res) {
        try { res.json(await bookService.getAllBooks()); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

    async addBook(req, res) {
        try { res.status(201).json({ id: await bookService.addBook(req.body) }); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

    async updateBook(req, res) {
        try { await bookService.updateBook(req.params.id, req.body); res.json({ message: "OK" }); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

   async deleteBook(req, res) {
    try {
        const { id } = req.params;
        
        // 1. Log the ID to ensure it's reaching the controller
        console.log(`Attempting to delete book with ID: ${id}`);

        const result = await bookService.deleteBook(id);
        
        // 2. Check if anything was actually deleted (Optional depending on your Service logic)
        res.json({ message: "Deleted successfully" });
    } catch (e) {
        // 3. THIS IS CRUCIAL: Log the full error in the terminal to see why it failed
        console.error("Error in deleteBook Controller:", e);
        
        // 4. Return the specific error message to the frontend
        res.status(500).json({ 
            error: "Failed to delete book", 
            details: e.message 
        });
    }
}

    async getBookById(req, res) {
        try { res.json(await bookService.getBookById(req.params.id)); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

    async borrowBook(req, res) {
        try { res.json({ message: await bookService.borrowBook(req.params.id, req.body.memberId) }); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

    async reserveBook(req, res) {
        try { res.json({ message: await bookService.reserveBook(req.params.id, req.body.memberId) }); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }

    async getMemberLoans(req, res) {
        try {
            const { id } = req.params;
            // Kjo bën check-in automatik pa e bllokuar faqen nëse dështon
            await bookService.checkOverdueLoans(id).catch(err => console.log("Overdue check fail"));
            
            const loans = await bookService.getLoansByMember(id);
            res.json(loans);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    async getMemberReservations(req, res) {
        try { res.json(await bookService.getReservationsByMember(req.params.id)); } 
        catch (e) { res.status(500).json({ error: e.message }); }
    }
}

module.exports = new BookController();