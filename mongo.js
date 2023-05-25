require('dotenv').config();
const { connect, connection, disconnect } = require('mongoose');

const executeQuery = (database) => {
  return new Promise((resolve) => {
    database
      .findOne({
        objectId: 'a', // objectId,
      })
      .then((result) => {
        if (result) {
          const { userId, timestamp, objectJson } = result;
          const object = JSON.parse(objectJson);
          console.log(object);
        }
        resolve();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });
};

const dbConnect = async () => {
  const DB_URL = process.env.DATABASE_MONGODB_LOCAL;

  await connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
      console.log('🚀 Database connected');
      const x = connection.useDb('default').collection('DatabaseLog');
      executeQuery(x).then(() => {
        disconnect();
      });
    })
    .catch((err) => {
      console.log('Database ERROR!!!', err);
    });
};

(async () => {
  await dbConnect();
  process.exitCode = 1;
})();
