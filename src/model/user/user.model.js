const { userSchema } = require("./user.schema");

//add new user to mongodb
const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    userSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
//fecth user from mongo by user email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false;
    try {
      userSchema.findOne({ email }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {}
  });
};
//fecth user from mongo by user id
const getUserByuserId = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;
    try {
      userSchema.findOne({ _id }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {}
  });
};

//add refresh token to specific user defined by _id
const addRefreshToken = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      userSchema
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              "refreshToken.token": token,
              "refreshToken.createdDate": Date.now(),
            },
          },
          { new: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteRefreshToken = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      userSchema
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              "refreshToken.token": token,
              "refreshToken.createdDate": Date.now(),
            },
          },
          { new: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  addRefreshToken,
  getUserByuserId,
  deleteRefreshToken,
};
