const { User } = require("../models");

const userdata = [
  {
    username: "Alvin",
    email: "alvin@gmail.com",
    password: "alvin1234",
  },
  {
    username: "Bonnie",
    email: "bonnie@msn.com",
    password: "bonnie2203",
  },
  {
    username: "Calvin",
    email: "calvin@hotmail.com",
    password: "calvin7890",
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
