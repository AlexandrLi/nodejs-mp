const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://node:root@node-mp-l6c8p.gcp.mongodb.net/node?retryWrites=true',
    {useNewUrlParser: true}
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No db found!';
};

module.exports = {mongoConnect, getDb};
