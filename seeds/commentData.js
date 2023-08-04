const { Comment } = require("../models");

const commentData = [
  {
    content: "Nice to meet you Alvin!",
    blog_id: 1,
    commentater_id: 2,
  },
  {
    content: "Hi Alvin, I want to work with you!",
    blog_id: 1,
    commentater_id: 3,
  },
  {
    content: "Good recommendation!",
    blog_id: 2,
    commentater_id: 2,
  },
  {
    content: "Well said!",
    blog_id: 3,
    commentater_id: 1,
  },
  {
    content: "Hi Calvin, your recommendation is so useful!",
    blog_id: 4,
    commentater_id: 2,
  },
  {
    content: "It's so tired to do projects, I don't have time!",
    blog_id: 5,
    commentater_id: 2,
  },
  {
    content: "I become a professional developer by following on your advice!",
    blog_id: 5,
    commentater_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
