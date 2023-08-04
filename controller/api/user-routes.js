const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

const minute = 60000;

router.get("/", async (req, res) => {
  try {
    const usersData = await User.findAll({
      include: [
        { model: Blog, attributes: ["id", "title", "content"] },
        { model: Comment, attributes: ["id", "content"] },
      ],
    });

    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        { model: Blog, attributes: ["id", "title", "content"] },
        { model: Comment, attributes: ["id", "content"] },
      ],
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.cookie.maxAge = minute;
    req.session.cookie.expires = new Date(new Date().getTime() + minute);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      //if cant find the userData
      res.status(400).json({
        message: "Incorrect username or password. Please try again!",
      });

      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        //if password dont match
        message: "Incorrect username or password. Please try again!",
      });

      return;
    }

    req.session.cookie.maxAge = minute;
    req.session.cookie.expires = new Date(new Date().getTime() + minute);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.status(200).json({ userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });

    if (await User.findByPk(req.params.id)) {
      res
        .status(200)
        .json(
          `The data of user with id ${req.params.id} is updated successfully.`
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .json(
        `The data of user with id ${req.params.id} is deleted successfully.`
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
