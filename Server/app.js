const express = require('express');
const bodyParser = require('body-parser');

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const { logger } = require('./utils/logger/logger');
const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes');
const app = express();

require("dotenv").config();

const cors = require("cors");

app.use(cors());

// Use your logger middleware to log requests and errors
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Error Handling middlewares
//app.use(notFound);
app.use(errorHandler);
//routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));