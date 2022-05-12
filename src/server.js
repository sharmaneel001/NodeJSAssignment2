require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` })

const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const { studentRoute } = require("./route/student");

const port = process.env.PORT;
const mongoUrl = process.env.MONGODB_URL;

const app = express();

app.use(cors())
app.use(express.json());
app.use(studentRoute);


const mongoConnect = () => {
  mongoose.connection
    .on('error', () => {
      console.log("Mongo connection failed")
    })
    .on('open', () => {
      console.log("Mongo DB Connection established...")
      startServer();
    });

  return mongoose.connect(mongoUrl, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}

const mongoConnectionShutDown = async () => {
  await mongoose.connection.close(false, () => {
    console.log('Mongo DB Connection closed...');
  })
}

const startServer = () => {
  app.listen(port, (req, res) => {
    console.log(`Server is up and running on port ${port}`)
  })
}

mongoConnect();

// This will handle process.exit():
process.on('exit', mongoConnectionShutDown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', mongoConnectionShutDown);
process.on('SIGTERM', mongoConnectionShutDown);
process.on('SIGKILL', mongoConnectionShutDown);

