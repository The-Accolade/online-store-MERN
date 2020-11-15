const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

// Import Routes
const User = require('./models/Users');
const routes = require('./routes/route');
// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to the Database!');
  }
);

// Middleware
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token'];
    const { userId, exp } = await jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET
    );
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: 'JWT token has expired, please login to obtain a new one',
      });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

// Route Middlewares
app.use('/api', routes);

const Port = process.env.Port || 5000;

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});