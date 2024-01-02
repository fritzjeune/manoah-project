const { Borrower, Payment, Address, Contact, Loan, Pledge, PaymentMethod, ReferencePerson } = require('../config/sequelize');

// Controller methods for Borrower
const getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.findAll({
            include: [
                { model: Address },
                { model: Contact },
                { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Payment, include: [{ model: PaymentMethod }]}] }
            ]
        });
        res.status(200).json(borrowers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBorrowerById = async (req, res) => {
    const { id } = req.params;
    try {
        const borrower = await Borrower.findByPk(id, {
            include: [
                { model: Address },
                { model: Contact },
                { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Payment, include: [{ model: PaymentMethod }]}] }
            ]
        });
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
        
        res.status(200).json(borrower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createBorrower = async (req, res) => {
    const borrowerData = req.body;
    try {
        // Create borrower
        const newBorrower = await Borrower.create(borrowerData)
        // Convert the Sequelize instance to JSON
        const borrowerJson = newBorrower.toJSON();

        // If an address is provided in the request body, associate it with the borrower
        let id = borrowerJson
        console.log(id)
        if (req.body.address) {
            const addressData = req.body.address;
            addressData.borrower_id = borrowerJson.borrower_id
            // Create address and associate it with the borrower
            const newAddress = await Address.create(addressData);
            // await newBorrower.setAddress(newAddress);
        }

        // If contacts are provided in the request body, associate them with the borrower
        if (req.body.contacts && req.body.contacts.length > 0) {
            const contactDataArray = req.body.contacts;
            contactDataArray.forEach(element => {
                element.borrower_id = borrowerJson.borrower_id
            });

            // Create contacts and associate them with the borrower
            const createdContacts = await Contact.bulkCreate(contactDataArray);
            // await newBorrower.setContacts(createdContacts);
        }

        // Respond with the created borrower
        res.status(201).json(newBorrower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBorrower = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const borrower = await Borrower.findByPk(id);
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
        await borrower.update(updatedData);
        res.status(200).json(borrower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBorrower = async (req, res) => {
    const { id } = req.params;
    try {
        const borrower = await Borrower.findByPk(id);
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
        await borrower.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllBorrowers,
    getBorrowerById,
    createBorrower,
    updateBorrower,
    deleteBorrower,
};
