const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/add", UserController.register);
router.post('/confirm/:emailToken', UserController.confirm)
router.get("/all", UserController.getAll);
router.get("/info",authentication,UserController.getUser)
router.get("/id/:_id", authentication, UserController.getById);
router.get('/name/:name', UserController.getByName)
router.delete("/delete/:_id",authentication,  UserController.delete);
router.put("/update/:_id", authentication, UserController.update);
router.post("/login", UserController.login);
router.delete("/logout", authentication,UserController.logout);
router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);



module.exports = router;
