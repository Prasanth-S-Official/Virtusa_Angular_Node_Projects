const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const employeeRouter = require('./routers/employeeRouter');

const app = express();
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const cors = require("cors"); // Import the cors package

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });


const corsOptions = {
  origin: "*", // Replace with the URL of your frontend application
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};


// Enable CORS with the specified options
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/empdb")
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("API is running in PORT:8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api/auth', userRouter);
app.use('/api', employeeRouter );