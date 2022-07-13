const Post = require("../models/Post");
const User = require("../models/User");
// const Comment = require("../models/Comment");

const PostController = {
  async create(req, res, next) {
    try {
      // compruebo si quiero añadir imagen o no
      if (req.file) req.body.img = req.file.destination + req.file.filename;
      let post = await Post.create({
        ...req.body,
        userId: req.user._id,
      });

      post = await post.populate({ path: "userId" });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send({ message: "Post created succesfully", post });
    } catch (error) {
      // catch (err) {
      //   // console.log(err)
      //   // err.origin = 'Post'
      //   res.send(err)
      //   // next(err)
      // }
      console.error(error);
      res
        .status(500)
        .send([
          { message: "There was an error creating the post" },
          error.message,
        ]);
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find({})
        .populate({ path: "userId" })
        .populate({
          path: "comments",
          select: { body: 1 },
          populate: { path: "userId", select: { name: 1 } },
        });

      // .limit(limit * 1)
      // .skip((page - 1) * limit);

      if (posts.length === 0) {
        res.send({ message: "There are no posts yet" });
      }
      res.send(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was an error loading the post" });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
        .populate({ path: "userId", select: { name: 1, avatar: 1, alias: 1 } })
        .populate({ path: "likes", select: { name: 1, avatar: 1 } })
        .populate({path:"comments", select:{_id:1,name:1,alias:1,avatar:1}})

      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `There wasn an error looking for the post with id = ${req.params._id}`,
      });
    }
  },
  async getByUser(req, res) {
    try {
      const posts = await User.findById(req.params._id).populate({
        path: "postIds",
        select: { title: 1 },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was an error loading the user",
      });
    }
  },
  async myPosts(req, res) {
    try {
      const posts = await User.findById(req.user._id).populate({
        path: "postIds",
        select: { title: 1 },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was an error loading the user's post",
      });
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);

      await User.findByIdAndUpdate(req.params._id,
        {$pull: { postIds: req.params._id },});
        
      // await Comment.deleteMany({postId:req.params._id});

      res.send({ message: "Post deleted", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was an error deleting the post" });
    }
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        { new: true }
      ).populate({ path: "userId" });
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likedPosts: req.params._id } },
        { new: true }
      );
      res.status(201).send({ message: "Post updated", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was an error updating the post" });
    }
  },
  async getByName(req, res) {
    try {
      const title = new RegExp(req.params.title, "i");
      const post = await Post.find({ title })
      .populate({ path: "userId", select: { name: 1, avatar: 1, alias: 1 } })
      .populate({ path: "likes", select: { name: 1, avatar: 1 } })
      .populate({path:"comments", select:{_id:1,name:1,alias:1,avatar:1}})
        
       
      if (post.length == 0) {
        return res.status(200).send({
          message: "We couldn't find any results",
        });
      }

      return res.status(200).send(post);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: `There was an error looking for the post` });
    }
  },
  async like(req, res) {
    try {
      let post = await Post.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { $nin: req.user._id },
        },
        { $push: { likes: req.user._id } },
        { new: true }
      );

      post = await post.populate({ path: "userId" });

      if (post) {
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { likedPosts: req.params._id } },
          { new: true }
        );
        res.send({ message: "Post liked", post });
      } else {
        res.send({ message: "You already liked this post" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `There was a problem liking this post` });
    }
  },
  async dislike(req, res) {
    try {
      let post = await Post.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { _id: req.user._id },
        },
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      post = await post.populate({ path: "userId" });

      if (post) {
        await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { likedPosts: req.params._id } },
          { new: true }
        );
        res.send({ message: "You unliked this post", post });
      } else {
        res.send({ message: "You already unliked this post before", post });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `There was an error unliking the post` });
    }
  },
};
module.exports = PostController;
