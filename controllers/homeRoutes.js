const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'content', 'date'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      page: 'The Tech Blog',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// withAuth middleware prevents acesss to route if user is not loggin
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // check if user is logged in bassed on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      ...user,
      logged_in: true,
      page: 'Your Dashboard',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'date', 'user_id'],
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('singleblog', {
      ...blog,
      logged_in: req.session.logged_in,
      page: 'The Tech Blog',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', { page: 'The Tech Blog' });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', { page: 'The Tech Blog' });
});

router.get('/createpost', (req, res) => {
  res.render('createpost');
});

module.exports = router;
