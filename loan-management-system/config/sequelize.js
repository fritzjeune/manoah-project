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
const PaymentModel = require('../models/Payment')

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    schema: 'loan',
    username: 'postgres',
    password: 'MoveAhead',
    database: 'postgres',
    logging: console.log,
    define: {
        freezeTableName: true
    }
})

sequelize.models = {};
// sequelize.modelManager.models = {};
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
const Payment = PaymentModel(sequelize);

Borrower.hasMany(Contact, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE'
});
Borrower.hasOne(Address, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE'
});
Borrower.hasMany(ReferencePerson, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE'
});
Borrower.hasMany(Loan, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE'
});

Loan.belongsTo(Borrower, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE',
});
Loan.hasMany(Pledge, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE',
});
Loan.hasMany(Payment, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE',
});
Loan.hasMany(ReferencePerson, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE',
});
Loan.belongsTo(LoanStatus, {
    foreignKey: 'loan_status_id',
    onDelete: 'CASCADE',
});
Payment.belongsTo(PaymentMethod, {
    foreignKey: 'payment_method_id',
    onDelete: 'CASCADE',
});
// // Sync models with the database
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
    Payment
}