const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashedPasword = (password) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(password, saltRounds));
  });
};

const comparePassword = (plainPassword, passwordFromDB) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, passwordFromDB, function (err, result) {
      if (err) reject(err);

      resolve(result);
    });
  });
};

module.exports = {
  hashedPasword,
  comparePassword,
};
