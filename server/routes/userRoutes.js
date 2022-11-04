const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/get-all").get(usersController.getAllUsers);

router.route("/create").post(usersController.createNewUser);

router.route("/update").post(usersController.updateUser);

router.route("/remove").post(usersController.deleteUser);

module.exports = router;
