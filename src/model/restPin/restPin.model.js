const { restPinSchema } = require("./restPin.schema");
const { randomPin } = require("../../router/utils/randomGenerator");

//add new user to mongodb
const setPasswordResetPin = async (email) => {
  //create pin
  const pinLength = 6;
  const restPin = await randomPin(pinLength);

  const restObj = {
    email,
    pin: restPin,
  };

  return new Promise((resolve, reject) => {
    restPinSchema(restObj)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

module.exports = {
  setPasswordResetPin,
};
