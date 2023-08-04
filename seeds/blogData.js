const { Blog } = require("../models");

const blogData = [
  {
    title: "The first greeting",
    content: "Hello, it's my first blog!",
    user_id: 1,
  },
  {
    title: "My recommendation of learning tech",
    content: "I think the best way of learning tech is to work hard.",
    user_id: 1,
  },
  {
    title: "Bonnie is here",
    content: "Hi! I am Bonnie. How are you? I learn tech from doing.",
    user_id: 2,
  },
  {
    title: "Calvin's method",
    content:
      "I will recommend people to learn tech from watching clips in YouTube.",
    user_id: 3,
  },
  {
    title: "Calvin's another recommendation",
    content: "You will learn tech quick by doing more project.",
    user_id: 3,
  },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;
