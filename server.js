const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers.js');
const checkSessionExpiration = require('./middleware/sessionExpiration');
const sequelize = require('./db/config');
const routes = require('./controllers');
const PORT = process.env.PORT || 3001;
const app = express();
const hbs = exphbs.create({ helpers });
require('dotenv').config();
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sessionConfig));
app.use(checkSessionExpiration);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
const force = process.env.FORCE_SYNC === 'true';
sequelize.sync({ force }).then(() => {
  app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
});
