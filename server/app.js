require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const {
  User, Sequelize,
} = require('./db/models');

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const sessionConfig = {
  name: 'mega-cookie',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};

app.use(session(sessionConfig));

app.get('/auth', async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.post('/auth', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log({ name, email, password });

    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ name }, { email }],
      },
    });

    if (user && (await bcrypt.compare(password, user.password) || password === user.password)) {
      req.session.name = user.name;
      req.session.userId = user.id;
      return res.json(user);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      { email, password: hashedPassword, name },
    );

    if (newUser.id) {
      req.session.name = newUser.name;
      req.session.userId = newUser.id;
      return res.json(newUser);
    }

    return res.json({});
  } catch (error) {
    return res.json(error);
  }
});

app.get('/logout', async (req, res) => {
  try {
    console.log(1111111111);
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

// app.get('/posts', async (req, res) => {
//   const { userid } = req.query;

//   const result = await Posts.findAll({ where: !+userid ? {} : { user_id: +userid }, limit: 100 });

//   res.json(result);
// });

// app.get('/posts/:postId', async (req, res) => {
//   const { postId } = req.params;
//   const result = await Posts.findOne({ where: { id: postId } });
//   res.json(result);
// });

// app.post('/posts', async (req, res) => {
//   const { title, body } = req.body;
//   const { userId } = req.session;

//   const result = await Posts.create({ title, body, user_id: userId });
//   res.json(result);
// });

// app.delete('/posts/:id', async (req, res) => {
//   const { id } = req.params;
//   await Posts.destroy({ where: { id } });
//   res.sendStatus(200);
// });

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
