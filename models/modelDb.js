const { client } = require("../config/config");

const Users = client.db("Restaurant").collection("Users");
const AllCategories = client.db("Restaurant").collection("Category");
const AllItem = client.db("Restaurant").collection("Item");
const AllCart = client.db("Restaurant").collection("Cart");
const AllPayments= client.db("Restaurant").collection("payments");
const AllRetails = client.db("Restaurant").collection("retails");

module.exports = { Users, AllCategories, AllItem, AllCart, AllPayments, AllRetails };
