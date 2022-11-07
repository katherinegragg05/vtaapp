const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/get-all").get(requestsController.getAllRequests);

router.route("/create").post(requestsController.createNewRequest);

// router.route("/update").post(requestsController.updateRequest);

// router.route("/remove").post(requestsController.deleteRequest);

module.exports = router;
