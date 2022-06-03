const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin, isAuthorPost } = require('../middlewares/authentication');
const Comment = require('../models/Comment');
const router = express.Router()

router.post('/add',authentication, CommentController.create)
router.get('/post/:_id', authentication, CommentController.getAllByPost)
router.get('/user/:_id', authentication, CommentController.getAllByUser)
router.delete('/delete/:_id', authentication, CommentController.delete)
router.put('/update/:_id', authentication, CommentController.update)

module.exports = router;