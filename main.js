const express = require("express");
const multer  = require('multer')
const upload = multer()
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config")
const { typeError } = require('./middlewares/errors');
const cors = require ('cors') 
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

dbConnection()
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use(typeError)

app.listen(PORT, console.log(`Server started on port ${PORT}`));