const {
  StockDB,
  StockItemDB,
  BookingDB,
  BookingItemDB,
  StockTransactionDB,
  StockTransactionItemDB,
} = require("../database/modelDB");
const sequelize = require("../config/db.config.init");
const { logger } = require("../utils/logger");
const typeTransitions = {
  return: "Возврат",
  arrival: "Приходная",
  writeOff: "Списание",
  writeOn: "Добавление плюс",
};
class StockModel {
  // Stock
  static async hasStockItem({ product_id, stock_id }) {
    return await StockItemDB.findOne({
      where: { product_id, stock_id },
    });
  }
  static async createStockItem({
    product_id,
    quantity = 0,
    stock_name = "main", // for one stock
  }) {
    try {
      const stock = await StockDB.findOne({
        where: { name: stock_name },
      });

      if (!(await this.hasStockItem({ product_id, stock_id: stock.id }))) {
        const stockItem = await stock.createStockItem({
          stock_id: stock.id,
          product_id,
          quantity,
        });
        return stockItem;
      }
      //   console.log(Object.getPrototypeOf(stock));
    } catch (error) {
      logger.error("Error creating stockItem:", error);
      throw error;
    }
  }
  static async updateStockItemQuantity({
    stockItem_id,
    incrementBy = 0,
    transaction = null,
  }) {
    try {
      const updateOptions = {};

      if (transaction) {
        updateOptions.transaction = transaction;
      }

      const stockItem = await StockItemDB.findByPk(stockItem_id);

      if (stockItem) {
        await stockItem.increment("quantity", {
          by: incrementBy,
          ...updateOptions,
        });

        return stockItem;
      } else {
        throw new Error("StockItem not found");
      }
    } catch (error) {
      logger.error("Error updating stockItem quantity:", error);
      throw error;
    }
  }

  // Booking
  static async createBooking({ items }) {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const booking = await BookingDB.create({}, { transaction });

      for (const item of items) {
        await booking.createBookingItem(
          {
            booking_id: booking.id,
            stockItem_id: item.id,
            quantity: item.quantity,
          },
          { transaction }
        );
      }

      await transaction.commit();

      return booking;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }

      logger.error("Error createBooking:", error);
      throw error;
    }
  }

  static async cancelBooking(bookingId) {
    try {
      const booking = await BookingDB.findByPk(bookingId);

      if (!booking) {
        throw new Error("Booking not found");
      }
      await booking.destroy();
      return bookingId;
    } catch (error) {
      logger.error("Error cancelBooking:", error);
      throw error;
    }
  }
  // transaction
  static async createTransaction({ type, items }) {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const createdTransaction = await StockTransactionDB.create(
        { transaction_type: type },
        { transaction }
      );

      const transactionType = ["return", "arrival", "writeOn", "writeOff"];
      if (!transactionType.includes(type)) {
        throw new Error("Invalid transaction type");
      }

      for (const item of items) {
        await createdTransaction.createStockTransactionItem(
          {
            stockTransaction_id: createdTransaction.id,
            stockItem_id: item.id,
            quantity: item.quantity,
          },
          { transaction }
        );

        if (type === "return" || type === "arrival" || type === "writeOn") {
          await this.updateStockItemQuantity({
            stockItem_id: item.id,
            incrementBy: item.quantity,
            transaction,
          });
        }

        if (type === "writeOff") {
          await this.updateStockItemQuantity({
            stockItem_id: item.id,
            incrementBy: -item.quantity,
            transaction,
          });
        }
      }

      await transaction.commit();

      return createdTransaction;
    } catch (error) {
      if (transaction) {
        console.log("Rolling back");
        await transaction.rollback();
      }

      logger.error("Error createTransaction:", error);
      throw error;
    }
  }
}
// StockModel.updateStockItemQuantity({ stockItem_id: 3, incrementBy: 6 });

StockModel.createTransaction({
  type: "return",
  items: [
    { id: 1, quantity: 10 },
    { id: 2, quantity: 20 },
  ],
});
// StockModel.cancelBooking(6);
module.exports = StockModel;
