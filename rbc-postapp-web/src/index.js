const express = require('express');
require('./db/mongoose');
const app = express();
const cors = require('cors');
const user = require('./routers/user.js');
const post = require('./routers/posts');

app.use(express.json());
app.use(cors());
app.use(user);
app.use(post);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
