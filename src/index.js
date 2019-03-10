const app = require('./app');
const {mongoConnect} = require('./database');

const port = process.env.PORT || 8080;

mongoConnect(() => {
  app.listen(port, () => console.log(`App is listening on ${port}`));
});
