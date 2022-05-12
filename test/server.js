
const { app } = require('./app');
const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Tests execution started`)
})
