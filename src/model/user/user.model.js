const { userSchema } = require("./user.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    userSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

module.exports = { insertUser };
