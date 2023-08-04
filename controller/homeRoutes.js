const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/util");

const minute = 300000;

router.get("/", async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    req.session.cookie.maxAge = minute;
    req.session.cookie.expires = new Date(new Date().getTime() + minute);

    const blogs = blogsData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      expires: req.session.cookie.expires,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    req.session.cookie.maxAge = minute;
    req.session.cookie.expires = new Date(new Date().getTime() + minute);

    res.render(`commentblog`, {
      blog,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      expires: req.session.cookie.expires,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [
        {
          model: Blog,
        },
      ],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      user,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      expires: req.session.cookie.expires,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });

    res.render(`updateblog`, {
      blog,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      expires: req.session.cookie.expires,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
