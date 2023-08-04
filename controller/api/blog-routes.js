const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Comment, attributes: ["id", "content"] },
      ],
    });

    res.status(200).json(blogsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Comment, attributes: ["id", "content"] },
      ],
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const blogData = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  console.log('I am clicked!')
  try {
    const BlogData = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      { where: { id: req.params.id } }
    );

    if (BlogData) {
      res
        .status(200)
        .json(
          `The data of blog with id ${req.params.id} is updated successfully.`
        );
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .json(
        `The data of blog with id ${req.params.id} is deleted successfully.`
      );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
