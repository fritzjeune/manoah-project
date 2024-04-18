const { BorrowerAccount, AccountTransaction, TransactionType, User, Borrower, AccountStatus, Versement, VersementMetadata, getNextAccountNumber, sequelize } = require("../config/sequelize")
const { generateCaseNumber } = require("../middlewares/date")

const getAccountById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const account = await BorrowerAccount.findByPk(id, {
            include: [
                { model: Borrower }, 
                { model: AccountStatus }, 
                { 
                    model: AccountTransaction,
                    include: [{model: TransactionType}]
                }, 
            ]
        })

        if (!account) {
            return res.status(404).json({
                message: "Account not found!"
            })
        }

        res.status(201).json(account)
    } catch (error) {
        return res.status(404).json({
            message: "Some server errors!",
            error: error.message
        })
    }
}

const getBorrowerAccount = async (req, res) => {
    try {
        const { borrowerId, accountId } = req.params
        console.log(borrowerId)
        const account = await BorrowerAccount.findOne({
            where: {
                    borrower_id: borrowerId,
                    account_id: accountId
                },
            include: [
                { model: Borrower }, 
                { model: AccountStatus }, 
                { 
                    model: AccountTransaction,
                    include: [{model: TransactionType}]
                }, 
            ]
        })

        if (account.length == 0) {
            return res.status(404).json({
                message: "Account not found!"
            })
        }

        res.status(201).json(account)
    } catch (error) {
        return res.status(404).json({
            message: "Some server errors!",
            error: error.message
        })
    }
}

const getBorrowerAccounts = async (req, res) => {
    try {
        const { borrowerId } = req.params
        console.log(borrowerId)
        const account = await BorrowerAccount.findAll({
            where: {
                    borrower_id: borrowerId
                },
            include: req.query.min ? [
                { model: Borrower, attributes: ['last_name', 'first_name', 'borrower_id']}, 
                { model: AccountStatus },
            ] : [
                { model: Borrower }, 
                { model: AccountStatus }, 
                { 
                    model: AccountTransaction,
                    include: [{model: TransactionType}]
                }, 
            ]
        })

        if (account.length == 0) {
            return res.status(404).json({
                message: "No Accounts found!"
            })
        }

        res.status(201).json(account)
    } catch (error) {
        return res.status(404).json({
            message: "Some server errors!",
            error: error.message
        })
    }
}

const createBorrowerAccount = async (req, res) => {
    try {
        const { borrowerId } = req.params
        const query = "SELECT nextval('loan.account_number_seq') as next_value;"
        const accNum = await sequelize.query(query, {plain: true})

        if (!accNum) {
            return res.status(404).json({
                message: "Account not created due to some server error"
            })
        }

        if (!borrowerId) {
            return res.status(404).json({
                message: "Borrower id must be passed!"
            })
        }

        const borrower = await Borrower.findByPk(borrowerId)
        if (!borrower) {
            return res.status(404).json({
                message: "Borrower not found or incorrect id!"
            })
        }

        await BorrowerAccount.create({
            borrower_id: borrower.borrower_id,
            devise: 1,
            balance: 0,
            account_status_id: 1,
            minimum_balance: 500,
            account_number: `01-01-${generateCaseNumber(accNum.next_value)}`
        })
        .then( async () => {
            await BorrowerAccount.findAll({
                where: {
                        borrower_id: borrowerId
                    },
                include: [
                    { model: Borrower }, 
                    { model: AccountStatus }, 
                    { 
                        model: AccountTransaction,
                        include: [{model: TransactionType}]
                    }, 
                ]
            })
            .then((accounts) => res.status(201).json(accounts))
        })
        .catch((err) => {
            if (err) {
                return res.status(404).json({
                    message: "Account not created",
                    error: err.message
                })
            }
        })
    } catch (error) {
        return res.status(404).json({
            message: "Some server errors!",
            error: error.message
        })
    }
}

const Deposit = async (req, res) => {
    try {
        
        const user = req.user.user_id
        const { accountId } = req.params

        const account = await BorrowerAccount.findByPk(accountId)

        if (!account) {
            return res.status(404).json({
                message: "Account not found!"
            })
        }

        if (account.account_status_id == 4 || account.account_status_id == 5) {
            return res.status(404).json({
                message: "Account is Blocked or Closed!"
            })
        }

        // if (account.borrower_id != parseInt(borrowerId)) {
        //     return res.status(404).json({
        //         message: "Some error found in account number and Borrower id!"
        //     })
        // }

        if (!req.body?.amount) {
            return res.status(404).json({
                message: "No data found!"
            })
        }

        if (!req.body.transaction_type_id ) {
            return res.status(404).json({
                message: "Transaction type not selected!"
            })
        }

        if ( req.body.transaction_type_id == 3 && !req.body.versement_id ) {
            return res.status(404).json({
                message: "Transaction type or versement to pay not selected!"
            })
        }

        const versement = await Versement.findByPk(req.body.versement_id)
        // if (!versement) {
        //     return res.status(404).json({
        //         message: "Versement not found or incorrect Id!"
        //     })
        // }

        req.body.balance = req.body.transaction_type_id == 1 ? (account.balance + parseFloat(req.body.amount)) : account.balance
        req.body.created_by = user
        req.body.borrower_account_id = account.account_id

        console.log("adding transactions", req.body)

        await AccountTransaction.create(req.body)
        .then(async (transaction) => {
            await account.update({balance: req.body.balance, account_status_id: 2})
            .then(async (account) => {
                if (transaction.transaction_type_id == 1) {
                    return await BorrowerAccount.findByPk(account.account_id, {
                        include : [{model: AccountTransaction, include: [{ model: TransactionType }, { model: User }]}, {model: Borrower}]
                    }).then((account) => res.status(201).json(account))
                }
                await VersementMetadata.create({
                    amount: transaction.amount,
                    created_by: user,
                    versement_id: versement.versement_id,
                    deposit_reference_id: transaction.transaction_id
                })
                .then((meta) => {
                    console.log(meta)
                    versement.update({
                        status_id: versement.grand_total <= transaction.amount ? 4 : 3,
                        versement_metadata_id: meta.id
                    })
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            data: {
                                transaction_id: transaction.transaction_id,
                                amount: transaction.amount,
                                versement_status_id: versement.grand_total <= transaction.amount ? 4 : 3,
                                balance: (parseFloat(versement.grand_total) - parseFloat(transaction.amount)).toFixed(2)
                            }
                        })
                    })
                })
                .catch((err) => console.log(err))
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Transaction failed",
                error: err.message
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: "No data found!",
            error: error.message
        })
    }

}

// const accWithdrawal = () => {

// }

const withDraw = async (req, res) => {
    try {
        const user = req.user.user_id
        const {borrowerId, accountId} = req.params

        const account = await BorrowerAccount.findByPk(accountId)
        if (!account) {
            return res.status(404).json({
                message: "Account not found!"
            })
        }

        if (!(account.account_status_id == 2)) {
            return res.status(404).json({
                message: "Account is Not active!"
            })
        }

        // if (account.borrower_id != parseInt(borrowerId)) {
        //     return res.status(404).json({
        //         message: "Some error found in account number and Borrower id!"
        //     })
        // }

        if (!req.body) {
            return res.status(404).json({
                message: "No data found!"
            })
        }

        if (!(account.balance - account.minimum_balance >= req.body.amount)) {
            return res.status(401).json({
                message: "Not enough funds!"
            })
        }

        req.body.balance = account.balance - req.body.amount
        req.body.created_by = user
        req.body.borrower_account_id = account.account_id
        req.body.transaction_type_id = 2

        console.log(req.body)

        await AccountTransaction.create(req.body)
        .then(async () => {
            await account.update({balance: req.body.balance})
            .then(async (account) => {
                await BorrowerAccount.findByPk(account.account_id, {
                    include : [{model: AccountTransaction, include: [{ model: TransactionType }, {model: User}]}, {model: Borrower}]
                }).then((account) => res.status(201).json(account))
            }).catch((err) => {
                // TODO: delete the transaction!
                return res.status(500).json({
                    message: "Transaction failed",
                    error: err.message
                })
            });
        }).catch((err) => {
            return res.status(500).json({
                message: "Transaction failed",
                error: err.message
            })
        });

        

    } catch (error) {
        return res.status(500).json({
            message: "Transaction failed",
            error: error.message
        })
    }
}

const changeAccountStatus = (req, res) => {

}

module.exports = {
    Deposit,
    withDraw,
    getBorrowerAccount, 
    getBorrowerAccounts,
    getAccountById,
    createBorrowerAccount
}