const { client } = require("../config/config");

const Users = client.db("Restaurant").collection("Users");
const AllCategories = client.db("Restaurant").collection("Category");
const AllItem = client.db("Restaurant").collection("Item");

module.exports = { Users, AllCategories, AllItem };
