require('dotenv').config();
const express = require('express');
const app = express();
const  router  = require('./routes/index')
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(router)
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT,console.log('Server running on port',PORT))