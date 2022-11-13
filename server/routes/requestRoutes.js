const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController");
const { upload } = require("../middleware/uploader");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/get-all").get(requestsController.getAllRequests);

router.route("/create").post(requestsController.createNewRequest);

// router
//   .route("/upload-receipt")
//   .post(upload.single("receipt"), requestsController.uploadReceipt);

router.route("/confirm-request").patch(requestsController.confirmRequest);

// router.route("/remove").post(requestsController.deleteRequest);

module.exports = router;
