const express = require('express');
const upload = require ("../middlewares/multer")
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthorPost } = require('../middlewares/authentication');
const router = express.Router()

router.post('/add',authentication, upload.single("image"),PostController.create)
router.get('/all', PostController.getAll)
router.get('/id/:_id',authentication, PostController.getById)
router.delete('/delete/:_id', PostController.delete)
router.put('/update/:_id',authentication, isAuthorPost,PostController.update)
router.get('/search/:title', PostController.getByName)
router.get('/search/id/:_id', authentication,PostController.getByUser)
router.get('/myPosts', authentication, PostController.myPosts)
router.put('/like/:_id', authentication, PostController.like);
router.put('/dislike/:_id', authentication, PostController.dislike);
module.exports = router;