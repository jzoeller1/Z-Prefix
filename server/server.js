const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile')["development"]);
const cors = require('cors');
app.use(express.json());
app.use(cors());