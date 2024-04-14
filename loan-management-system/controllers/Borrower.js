const { Borrower, Address, Contact, Loan, Pledge, PaymentMethod, ReferencePerson, LoanPaymentFrequence, LoanStatus, InterestMethod, BorrowerAccount, Versement, VersementMetadata, AccountStatus, AccountTransaction, sequelize } = require('../config/sequelize');
const { generateCaseNumber } = require('../middlewares/date');

// Controller methods for Borrower
const getAllBorrowers = async (req, res) => {
    try {
        
        const borrowers = await Borrower.findAll({
            include: [
                { model: Address },
                { model: Contact },
                { model: BorrowerAccount, include: [{ model: AccountStatus }, { model: AccountTransaction }] },
                { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Versement, include: [{ model: VersementMetadata }]}] }
            ],
            // attributes: [
            //     [sequelize.fn('FORMAT', sequelize.cast(sequelize.col('borrower.createdAt'), 'VARCHAR'), 'yyyy-mm-dd'), 'createdAt']
            // ],
            order: [[sequelize.col('borrower.createdAt'), 'DESC']],
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
                { model: BorrowerAccount, include: [{ model: AccountStatus }, { model: AccountTransaction }] },
                { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Versement, include: [{ model: VersementMetadata }]}, {model: LoanPaymentFrequence}, {model: LoanStatus}, {model: InterestMethod}] }
            ],
            order: [[{model: BorrowerAccount}, {model: AccountTransaction}, 'createdAt', 'DESC']],
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
    const user = req.user
    req.body.created_by = user.dataValues?.user_id
    if (req.body.address && !req.body.address?.is_property_owner) {
        req.body.address.is_property_owner = false
    }
    const borrowerData = req.body;
    console.log(borrowerData)
    try {
        // Create borrower
        let newBorrower = await Borrower.create(borrowerData)
        // Convert the Sequelize instance to JSON
        const borrowerJson = newBorrower.toJSON();

        // If an address is provided in the request body, associate it with the borrower
        let id = borrowerJson
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

        const query = "SELECT nextval('loan.account_number_seq') as next_value;"
        const accNum = await sequelize.query(query, {plain: true})

        if (!accNum) {
            return res.status(404).json({
                message: "Account number not generated due to some server error"
            })
        }

        incremNumber = generateCaseNumber(accNum.next_value)
        console.log(incremNumber)

        await BorrowerAccount.create({
            borrower_id: newBorrower.borrower_id,
            devise: 1,
            balance: 0,
            account_status_id: 1,
            minimum_balance: 500,
            account_number: `01-01-${incremNumber}`
        })

        newBorrower = await Borrower.findByPk(newBorrower.borrower_id, {
            include: [
                { model: Address },
                { model: Contact },
                { model: BorrowerAccount, include: [{ model: AccountStatus }, { model: AccountTransaction }] },
                { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Versement, include: [{ model: VersementMetadata }]}, {model: LoanPaymentFrequence}, {model: LoanStatus}, {model: InterestMethod}] }
            ]
        });

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
        await borrower.update(updatedData)
        .then(async (borrower) => {
            await Borrower.findByPk(borrower.borrower_id, {
                include: [
                    { model: Address },
                    { model: Contact },
                    { model: BorrowerAccount, include: [{ model: AccountStatus }, { model: AccountTransaction }] },
                    { model: Loan, include: [{model: Pledge}, {model: ReferencePerson}, { model: Versement, include: [{ model: VersementMetadata }]}, {model: LoanPaymentFrequence}, {model: LoanStatus}, {model: InterestMethod}] }
                ]
            })
            .then((borrower) => res.status(200).json(borrower))
        })
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
