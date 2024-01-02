// controllers/Pledge.js
const { Pledge, Loan } = require('../config/sequelize');

// Get all pledges for a specific loan
const getAllPledges = async (req, res) => {
    try {
        const pledges = await Pledge.findAll({
            where: { loan_id: req.params.loanId },
        });
        res.status(200).json(pledges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific pledge by ID
const getPledgeById = async (req, res) => {
    try {
        const pledge = await Pledge.findByPk(req.params.id);
        if (pledge && pledge.loan_id === parseInt(req.params.loanId)) {
            res.status(200).json(pledge);
        } else {
            res.status(404).json({ message: 'Pledge not found for the given loan ID' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new pledge for a specific loan
const createPledge = async (req, res) => {
    try {
        let pledgeData = req.body;
        const loanId = req.params.loanId;
        pledgeData.loan_id = loanId

        const pledge = await Pledge.create(pledgeData);

        res.status(201).json(pledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a specific pledge by ID
const updatePledge = async (req, res) => {
    try {
        const pledge = await Pledge.findByPk(req.params.id);
        if (!pledge || pledge.loan_id !== Number(req.params.loanId)) {
            return res.status(404).json({ message: 'Pledge not found for the given loan ID' });
        }

        const pledge2Update = req.body;

        await pledge.update(pledge2Update);

        res.status(200).json(pledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a specific pledge by ID
const deletePledge = async (req, res) => {
    try {
        const pledge = await Pledge.findByPk(req.params.id);
        if (!pledge || pledge.loan_id !== Number(req.params.loanId)) {
            return res.status(404).json({ message: 'Pledge not found for the given loan ID' });
        }

        // Check if it's the only pledge associated with the loan
        const pledgeCount = await Pledge.count({ where: { loan_id: req.params.loanId } });
        if (pledgeCount === 1) {
            return res.status(400).json({ message: 'Cannot remove the only pledge for the loan' });
        }

        await pledge.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllPledges,
    getPledgeById,
    createPledge,
    updatePledge,
    deletePledge,
};
