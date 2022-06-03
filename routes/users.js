const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const User = require("../models/User");
const router = express.Router();

router.post("/add", UserController.register);
// router.post('/confirm', UserController.confirm)
router.get("/all", UserController.getAll);
router.get("/info", authentication,UserController.getUser)
router.get("/id/:_id", authentication, isAdmin, UserController.getById);
router.get('/name/:name', UserController.getByName)
router.delete("/delete/:_id",authentication, isAdmin, UserController.delete);
router.put("/update/:_id", authentication, isAdmin, UserController.update);
router.post("/login", UserController.login);
router.put("/logout", authentication,UserController.logout);

module.exports = router;
