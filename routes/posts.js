const express = require('express');
const upload = require ("../middlewares/multer")
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthorPost } = require('../middlewares/authentication');
const router = express.Router()

router.post('/add',authentication, upload.single("image"),PostController.create)
router.get('/all', PostController.getAll)
router.get('/id/:_id',authentication, isAdmin,PostController.getById)
router.delete('/delete/:_id',authentication,isAdmin, PostController.delete)
router.put('/update/:_id',authentication,isAuthorPost, upload.single("image"),PostController.update)
router.get('/search/:search', PostController.getByName)
router.get('/search/id/:_id', authentication,isAdmin,PostController.getByUser)
router.get('/mine', authentication,PostController.getMine)
router.put('/like/:_id', authentication, PostController.like);
router.put('/unlike/:_id', authentication, PostController.unlike);
module.exports = router;