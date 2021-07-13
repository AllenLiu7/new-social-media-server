const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usersRouter = require('./routes/user.routers');
const authRouter = require('./routes/auth.routers');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('combined'));

app.use(express.json());
//app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// app.use('/v1', api);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
