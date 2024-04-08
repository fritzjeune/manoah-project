const { BorrowerAccount, AccountTransaction, TransactionType, User, Borrower, AccountStatus } = require("../config/sequelize")

const getBorrowerAccount = async (req, res) => {
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

        req.body.balance = account.balance + req.body.amount
        req.body.created_by = user
        req.body.borrower_account_id = account.account_id
        req.body.transaction_type_id = 1

        console.log("adding transactions", req.body)

        const transaction = await AccountTransaction.create(req.body)
        .then(async (transaction) => {
            await account.update({balance: req.body.balance, account_status_id: 2}, {
                include : [{model: TransactionType}, {model: User}]
            }).then((account) => res.status(201).json(account))
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

        await AccountTransaction.create(req.body)
        .then(async (result) => {
            await account.update({balance: req.body.balance}, {
                include : [{model: TransactionType}, {model: User}]
            })
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
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
    getBorrowerAccount
}