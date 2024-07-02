// src/index_id.js
const express = require('express');
const uploadIDRouter = require('./routes/upload_id');

const app = express();
const port = 3011;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/upload_id', uploadIDRouter);

app.listen(port, () => {
  console.log(`ID Server is running at http://149.50.128.198:${port}`);
});
