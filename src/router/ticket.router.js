const express = require("express");
const router = express.Router();
const { userAuthorization } = require("../helper/authorization");
const {
  insertTicket,
  getTicket,
  getTicketbyId,
  updateTicket,
  updateStatusClose,
  deletTicketbyid,
} = require("../model/ticket/ticket.model");

// router.all("/", (req, res, next) => {
//   res.json({ message: "this is ticket route" });
//   next();
// });

//add new ticket, for authorization we use user id to confirm user is auhtorized.
router.post("/newticket", userAuthorization, async (req, res) => {
  const { subject, message, sender } = req.body;
  const userId = req.userId;

  const ticket = {
    subject,
    clientId: userId,
    message,
    conversation: [{ sender, message }],
  };

  const result = await insertTicket(ticket);

  if (result._id) {
    return res.json({
      status: "success",
      message: "New ticket added successfuly.",
    });
  }
  res.json({
    status: "error",
    message: "error in adding new ticket,plz try agein.",
  });
});

//get all tickets of a user, for authorization we use user id to confirm user is auhtorized.
router.get("/", userAuthorization, async (req, res) => {
  const userId = req.userId;

  const result = await getTicket(userId);
  console.log(result.length);
  return res.json({
    status: "success",
    result,
  });
});

//get a specifice ticket of user, for authorization we use user id to confirm user is auhtorized.
router.get("/:_id", userAuthorization, async (req, res) => {
  //get id of ticket which is in url and comes via request params object.
  const { _id } = req.params;
  const userId = req.userId;
  const result = await getTicketbyId(_id, userId);
  return res.json({
    status: "success",
    result,
  });
});

//update reply of ticket(message and sender) ,for authorization we use user id to confirm user is auhtorized.
router.put("/:_id", userAuthorization, async (req, res) => {
  const { _id } = req.params;
  const clientId = req.userId;
  console.log(clientId);

  const { message, sender } = req.body;

  const result = await updateTicket(_id, clientId, message, sender);

  if (result._id) {
    return res.json({
      status: "success",
      message: "ticket updated successfuly.",
    });
  }
  res.json({
    status: "error",
    result,
  });
});
//update tickes's status to close,for authorization we use user id to confirm user is auhtorized.
router.patch("/ticketclose/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await updateStatusClose(_id);
    console.log(result);
    if (result) {
      return res.json({
        status: "success",
        message: "ticket is closed.",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

//delete a ticket using id,for authorization we use user id to confirm user is auhtorized.
router.delete("/ticketclose/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await deletTicketbyid(_id, clientId);
    console.log(result);
    if (result) {
      res.json({
        status: "success",
        message: "ticket deleted successfuly",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});
module.exports = router;
