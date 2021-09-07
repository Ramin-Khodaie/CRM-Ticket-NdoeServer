const joi = require("joi");

const shortStr = joi.string().min(2).max(50);
const longStr = joi.string().min(2).max(1000);

const createTicketValidation = (req, res, next) => {
  const schema = joi.object({
    subject: shortStr,
    sender: longStr,
    message: longStr,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    //   res.json({
    //     status: "error",
    //     message: value.error,
    //   });

    console.log(vlaue.error);
  }

  res.json({ status: "error" });

  next();
};

const replyTicketValidation = (req, res, next) => {
  const schema = joi.object({
    sender: shortStr.required(),
    message: longStr.required(),
  });

  const value = joi.valid(schema);

  if (valid.error) {
    console.log(value.error);
  }

  next();
};
module.export = {
  createTicketValidation,
  replyTicketValidation,
};
