const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.init");
const { logger } = require("../utils/logger");

// Define User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  login: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
});

// Define Product model
const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,

});

// Define Categories model
const Categories = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  parentSub_id: DataTypes.INTEGER,
});

// Define Counterparty model
const Counterparty = sequelize.define("Counterparty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  balance: DataTypes.STRING,
});

// Define CounterpartyInvoices model
const CounterpartyInvoices = sequelize.define("CounterpartyInvoices", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: DataTypes.STRING,
});

// Define CounterpartyInvoicesItem model
const CounterpartyInvoicesItem = sequelize.define("CounterpartyInvoicesItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Define Stock model
const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
});

// Define StockItem model
const StockItem = sequelize.define("StockItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

// Define StockTransaction model
const StockTransaction = sequelize.define("StockTransaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transaction_type: DataTypes.STRING,
});

// Define StockTransactionItem model
const StockTransactionItem = sequelize.define("StockTransactionItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

// Define Booking model
const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Define BookingItem model
const BookingItem = sequelize.define("BookingItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

// Define Payment model
const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: DataTypes.DECIMAL,
  payment_type: DataTypes.STRING,
  currency_type: DataTypes.STRING,
});

// Define Currencies model
const Currencies = sequelize.define("Currencies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  value: DataTypes.FLOAT,
});

// Define Discount model
const Discount = sequelize.define("Discount", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  value: DataTypes.FLOAT,
});

// Define relationships between models

// User - CounterpartyInvoices (OneToMany)
User.hasMany(CounterpartyInvoices, { foreignKey: "user_id" });
CounterpartyInvoices.belongsTo(User, { foreignKey: "user_id" });

// User - Payment (OneToMany)
User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

// Counterparty - CounterpartyInvoices (OneToMany)
Counterparty.hasMany(CounterpartyInvoices, { foreignKey: "counterparty_id" });
CounterpartyInvoices.belongsTo(Counterparty, { foreignKey: "counterparty_id" });
// Counterparty - Payment (OneToMany)
Counterparty.hasMany(Payment, { foreignKey: "counterparty_id" });
Payment.belongsTo(Counterparty, { foreignKey: "counterparty_id" });

// CounterpartyInvoices - CounterpartyInvoicesItem (OneToMany)
CounterpartyInvoices.hasMany(CounterpartyInvoicesItem, {
  foreignKey: "invoice_id",
});
CounterpartyInvoicesItem.belongsTo(CounterpartyInvoices, {
  foreignKey: "invoice_id",
});

// Discount - CounterpartyInvoices (OneToMany)
Discount.hasMany(CounterpartyInvoices, { foreignKey: "discount_id" });
CounterpartyInvoices.belongsTo(Discount, { foreignKey: "discount_id" });

// Product - CounterpartyInvoicesItem (OneToMany)
Product.hasMany(CounterpartyInvoicesItem, { foreignKey: "product_id" });
CounterpartyInvoicesItem.belongsTo(Product, { foreignKey: "product_id" });
// Product - StockItem (OneToMany)
Product.hasMany(StockItem, { foreignKey: "product_id" });
StockItem.belongsTo(Product, { foreignKey: "product_id" });
// Categories - Product (OneToMany)
Categories.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Categories, { foreignKey: "category_id" });

// Stock - Booking (OneToMany)
Stock.hasMany(Booking, { foreignKey: "stock_id" });
Booking.belongsTo(Stock, { foreignKey: "stock_id" });
// Stock - StockItem (OneToMany)
Stock.hasMany(StockItem, { foreignKey: "stock_id" });
StockItem.belongsTo(Stock, { foreignKey: "stock_id" });

// Stock - StockTransaction (OneToMany)
Stock.hasMany(StockTransaction, { foreignKey: "stock_id" });
StockTransaction.belongsTo(Stock, { foreignKey: "stock_id" });

// StockTransaction - StockTransactionItem (OneToMany)
StockTransaction.hasMany(StockTransactionItem, {
  foreignKey: "stockTransaction_id",
});
StockTransactionItem.belongsTo(StockTransaction, {
  foreignKey: "stockTransaction_id",
});

// StockItem - StockTransactionItem (OneToMany)
StockItem.hasMany(StockTransactionItem, { foreignKey: "stockItem_id" });
StockTransactionItem.belongsTo(StockItem, { foreignKey: "stockItem_id" });

// Booking - BookingItem (OneToMany)
Booking.hasMany(BookingItem, { foreignKey: "booking_id" });
BookingItem.belongsTo(Booking, { foreignKey: "booking_id" });

// Booking - StockItem (Many-to-Many through BookingItem)
Booking.belongsToMany(StockItem, {
  through: BookingItem,
  foreignKey: "booking_id",
});
StockItem.belongsToMany(Booking, {
  through: BookingItem,
  foreignKey: "stockItem_id",
});

// Synchronize the models with the database

(async () => {
  try {
    await sequelize
      .sync({ force: false }) // force: true удаляет и создает таблицы заново (осторожно при использовании в продакшн)
      .then(() => {
        logger.info("Tables created successfully");
      })
      .catch((error) => {
        logger.error(error.message);
      });
  } catch (error) {
    logger.error(error.message);
  } finally {
    sequelize.close();
    process.exit(0);
  }
})();
module.exports = {
  UserDB: User,
  ProductDB: Product,
  CategoryDB: Categories,
  CounterpartyDB: Counterparty,
  CounterpartyInvoicesDB: CounterpartyInvoices,
  CounterpartyInvoicesItemDB: CounterpartyInvoicesItem,
  StockDB: Stock,
  StockItemDB: StockItem,
  StockTransactionDB: StockTransaction,
  StockTransactionItemDB: StockTransactionItem,
  BookingDB: Booking,
  BookingItemDB: BookingItem,
  PaymentDB: Payment,
  CurrenciesDB: Currencies,
  DiscountDB: Discount,
};
