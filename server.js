const express = require('express');
const { connection, connectionString } = require('./config/connection');
const allRoutes = require('./routes'); // TODO ROUTES
const cors = require("cors")
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', allRoutes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Aisleland Backend running on port ${PORT}!`);
  });
});
