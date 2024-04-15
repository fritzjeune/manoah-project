const Sequelize = require('sequelize')
const UserModel = require('../models/User')
const BorrowerModel = require('../models/Borrower')
const ContactModel = require('../models/Contact')
const AddressModel = require('../models/Address')
const LoanModel = require('../models/Loan')
const RoleModel = require('../models/Role')
const LoanStatusModel = require('../models/LoanStatus')
const ReferencePersonModel = require('../models/ReferencePerson')
const TokenModel = require('../models/Token')
const PledgeStatusModel = require('../models/PledgeStatus')
const PledgeModel = require('../models/Pledge')
const PaymentMethodModel = require('../models/PaymentMethod')
const LoanPaymentFrequenceModel = require('../models/LoanPaymentFrequence')
const InterestMethodModel = require('../models/InterestMethod')
const VersementModel = require('../models/Versement')
const VersementMetadataModel = require('../models/VersementMetadata')
const DepositModel = require('../models/Deposit')
const PaymentForModel = require('../models/PaymentFor')
const BorrowerAccountModel = require('../models/BorrowerAccount')
const AccountStatusModel = require('../models/AccountStatus')
const VersementStatusModel = require('../models/VersementStatus')
const TransactionTypeModel = require('../models/TransactionType')
const AccountTransactionModel = require('../models/AccountTransaction')
const PenalityReportModel = require('../models/PenalityReport')
const DisbursementModel = require('../models/Disbursement')

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '127.0.0.1',
    port: '5433',
    schema: 'loan',
    username: 'postgres',
    password: 'MoveAhead',
    database: 'postgres',
    logging: console.log,
    define: {
        freezeTableName: true,
    },
    dialectOptions: {
        decimalNumbers: true
    }
})

sequelize.models = {};
sequelize.modelManager.all = {};

const Role = RoleModel(sequelize);
const User = UserModel(sequelize);
const Address = AddressModel(sequelize);
const Contact = ContactModel(sequelize);
const ReferencePerson = ReferencePersonModel(sequelize);
const Borrower = BorrowerModel(sequelize);
const LoanStatus = LoanStatusModel(sequelize);
const Loan = LoanModel(sequelize);
const Token = TokenModel(sequelize);
const PledgeStatus = PledgeStatusModel(sequelize);
const Pledge = PledgeModel(sequelize);
const PaymentMethod = PaymentMethodModel(sequelize);
const LoanPaymentFrequence = LoanPaymentFrequenceModel(sequelize);
const InterestMethod = InterestMethodModel(sequelize);
const PaymentFor = PaymentForModel(sequelize);
const Deposit = DepositModel(sequelize);
const Versement = VersementModel(sequelize);
const VersementMetadata = VersementMetadataModel(sequelize);
const BorrowerAccount = BorrowerAccountModel(sequelize);
const AccountStatus = AccountStatusModel(sequelize);
const VersementStatus = VersementStatusModel(sequelize);
const TransactionType = TransactionTypeModel(sequelize);
const AccountTransaction = AccountTransactionModel(sequelize);
const Disbursement = DisbursementModel(sequelize);
const PenalityReport = PenalityReportModel(sequelize);

Borrower.hasMany(Contact, {
    foreignKey: 'borrower_id',
});
Borrower.hasOne(Address, {
    foreignKey: 'borrower_id',
});
Borrower.hasMany(ReferencePerson, {
    foreignKey: 'borrower_id',
});
Borrower.hasMany(Loan, {
    foreignKey: 'borrower_id',
});
Borrower.hasMany(BorrowerAccount, {
    foreignKey: 'borrower_id',
});

Loan.belongsTo(Borrower, {
    foreignKey: 'borrower_id'
});
Loan.hasMany(Pledge, {
    foreignKey: 'loan_id',
});
Loan.hasMany(Versement, {
    foreignKey: 'loan_id',
});
Loan.hasMany(ReferencePerson, {
    foreignKey: 'loan_id',
});
Loan.belongsTo(LoanStatus, {
    foreignKey: 'loan_status_id'
});
Loan.hasOne(LoanPaymentFrequence, {
    foreignKey: 'id'
});
Loan.hasOne(Disbursement, {
    foreignKey: 'disbursement_id'
});
Loan.hasOne(InterestMethod, {
    foreignKey: 'id'
});

User.belongsTo(Role, {
    foreignKey: 'role_id'
});

Versement.belongsTo(Loan, {
    foreignKey: 'loan_id'
});
Versement.belongsTo(VersementMetadata, {
    foreignKey: 'versement_metadata_id'
});
Versement.belongsTo(VersementStatus, {
    foreignKey: 'status_id'
});

BorrowerAccount.belongsTo(AccountStatus, {
    foreignKey: 'account_status_id'
});
BorrowerAccount.belongsTo(Borrower, {
    foreignKey: 'borrower_id'
});
BorrowerAccount.hasMany(AccountTransaction, {
    foreignKey: 'borrower_account_id'
});

AccountTransaction.belongsTo(TransactionType, {
    foreignKey: 'transaction_type_id'
});

AccountTransaction.belongsTo(BorrowerAccount, {
    foreignKey: 'borrower_account_id'
});

AccountTransaction.belongsTo(User, {
    foreignKey: 'created_by'
});

Disbursement.belongsTo(User, {
    foreignKey: 'created_by'
});

Disbursement.belongsTo(PaymentMethod, {
    foreignKey: 'payment_method_id'
})

const getNextAccountNumber = async () => {
    const query = "SELECT nextval('loan.account_number_seq') as next_value;"
    await sequelize.query(query, {plain: true})
    .then((result) => {
        return result
    }).catch((err) => {
        console.log(err)
    });
    // return result.next_value;
}

// Payment.belongsTo(PaymentMethod, {
//     foreignKey: 'payment_method_id'
// });

// Sync models with the database
// sequelize.sync({ alter: true }).then(() => {
//     console.log('Database synced');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });

module.exports = {
    sequelize, 
    Role,
    User,
    Borrower,
    Address,
    Contact,
    LoanStatus,
    Loan,
    ReferencePerson,
    Token,
    Pledge,
    PledgeStatus,
    PaymentMethod,
    LoanPaymentFrequence,
    InterestMethod,
    PaymentFor,
    Versement,
    VersementMetadata,
    Deposit,
    BorrowerAccount,
    AccountStatus,
    VersementStatus,
    AccountTransaction,
    TransactionType,
    PenalityReport,
    Disbursement
}