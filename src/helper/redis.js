const redis = require("redis");
const client = redis.createClient();

//set JWT key value pair in redis
const setJWT = (key, value) => {
  console.log(typeof key, typeof value);
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

//get JWT value from redis
const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      return client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  setJWT,
  getJWT,
};
