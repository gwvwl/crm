// const UserModel = require("../models/user.model");

// const { StockDB } = require("../database/modelDB");

// const { ADMIN_LOGIN, ADMIN_PASS } = require("../utils/secrets");

// const admin = {
//   login: ADMIN_LOGIN,
//   password: ADMIN_PASS,
//   type: "admin",
// };

// async function start() {
//   const adminUser = await UserModel.createUser(admin);
//   await StockDB.findOrCreate({
//     where: { name: "main" },
//     defaults: { name: "main" },
//   });
//   const data = await UserModel.getUserById(adminUser.id);
//   console.log(data.toJSON());
// }
// start();
