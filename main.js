const express = require("express");
const app = express();
// const PORT = 8080;
require("dotenv").config();
// sustitute a la constante PORT anterior 
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config")
const { typeError } = require('./middlewares/errors');


app.use(express.json())


dbConnection()

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.use(typeError)



app.listen(PORT, console.log(`Server started on port ${PORT}`));