const app = require('./app');
const db = require('./models');
const port = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() =>
    app.listen(port, () => console.log(`App is listening on ${port}`))
  )
  .catch(err => console.log(err));
