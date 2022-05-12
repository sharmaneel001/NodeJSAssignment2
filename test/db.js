const mongoose = require('mongoose')
const { studentModel } = require('../src/model/student')
const mongoUrl = process.env.MONGODB_URL;

const mongoConnect = async () => {

  return mongoose.connect(mongoUrl, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}

const setupDatabase = async () => {
  await mongoConnect();
  await studentModel.deleteMany();
}

const teardownDatabase = async () => {
  await studentModel.deleteMany();
}

module.exports = {
  setupDatabase,
  teardownDatabase
}