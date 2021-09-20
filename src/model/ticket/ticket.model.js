const { ticketSchema } = require("./ticket.schema");

const insertTicket = (ticket) => {
  try {
    return new Promise((resolve, reject) => {
      ticketSchema(ticket)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};

const getTicket = (clientId) => {
  try {
    return new Promise((resolve, reject) => {
      ticketSchema
        .find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};

const getTicketbyId = (_id, clientId) => {
  try {
    return new Promise((resolve, reject) => {
      ticketSchema
        .findOne({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};

const updateTicket = (_id, clientId, message, sender) => {
  try {
    return new Promise((resolve, reject) => {
      if (message === "") {
        reject(error);
      }
      ticketSchema
        .findOneAndUpdate(
          { _id, clientId },
          {
            status: "pending operator response",
            $push: { conversation: { message, sender } },
          },
          { new: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};

const updateStatusClose = (_id) => {
  try {
    return new Promise((resolve, reject) => {
      ticketSchema
        .findOneAndUpdate({ _id }, { status: "closed" }, { new: true })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};

const deletTicketbyid = (_id, clientId) => {
  try {
    return new Promise((resolve, reject) => {
      ticketSchema
        .findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  } catch (error) {
    reject(error);
  }
};
module.exports = {
  insertTicket,
  getTicket,
  getTicketbyId,
  updateTicket,
  updateStatusClose,
  deletTicketbyid,
};
