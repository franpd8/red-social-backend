const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin,isAuthorComment } = require('../middlewares/authentication');
const router = express.Router()

router.post('/add',authentication, CommentController.create)
router.get('/all', CommentController.getAll)
router.get('/post/:_id', authentication, CommentController.getAllByPost)
router.get('/user/:_id', authentication, CommentController.getAllByUser)
router.delete('/delete/:_id', authentication, isAdmin,CommentController.delete)
router.put('/update/:_id', authentication,isAuthorComment ,CommentController.update)
router.put('/like/:_id', authentication, CommentController.like);
router.put('/unlike/:_id', authentication, CommentController.unlike);

module.exports = router;