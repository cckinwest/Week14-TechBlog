const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Blog, attributes: ["id", "title", "content"] },
      ],
    });

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Blog, attributes: ["id", "title", "content"] },
      ],
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blogId,
      commentater_id: req.session.userId,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Comment.update(req.body, { where: { id: req.params.id } });

    if (await Comment.findByPk(req.params.id)) {
      res
        .status(200)
        .json(
          `The data of comment with id ${req.params.id} is updated successfully.`
        );
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .json(
        `The data of comment with id ${req.params.id} is deleted successfully.`
      );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
