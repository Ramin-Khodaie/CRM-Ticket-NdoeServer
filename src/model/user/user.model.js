const { userSchema } = require("./user.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    userSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

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
module.exports = { insertUser, getUserByEmail, addRefreshToken };
