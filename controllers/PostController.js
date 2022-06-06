const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const PostController = {
  async create(req, res, next) {
    try {
      // compruebo si quiero añadir imagen o no 
       if(req.file) req.body.img = (req.file.destination + req.file.filename)
      const post = await Post.create({
        ...req.body,
        userId: req.user._id
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send({ message: "Post añadido con éxito", post });
    
      
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
          { message: "Ha habido un problema al crear el post" },
          error.message,
        ]);
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find({}, { img:1,title: 1, body: 1, comments: 1})
        .populate({ path: "userId", select: { name: 1, email: 1 } })
        .populate({
          path: "comments",
          select: { body: 1 },
          populate: { path: "userId", select: { name: 1 } },
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        
        if(posts.length === 0){
          res.send({message:"Todavía no hay posts"})
        }
      res.send(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar los posts" });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Ha habido un problema al buscar el post con id = ${req.params._id}`,
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
        message: "Ha habido un problema al cargar los post del usuario",
      });
    }
  },
  async getMine(req, res) {
    try {
      const posts = await User.findById(req.user._id).populate({
        path: "postIds",
        select: { title: 1 },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al cargar los post del usuario",
      });
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
     
      // await User.findByIdAndUpdate(req.params._id,
      //   {$pull: { postIds: req.params._id },});
      // await Comment.deleteMany({postId:req.params._id});
  
      res.send({ post, message: "Post eliminado con todo lo demás" });
  
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el post" });
    }
  },
  async update(req, res) {

    console.log(req.file)
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, {...req.body,img:req.file.filename}, {
        new: true,
      });
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likedPosts: req.params._id } },
        { new: true }
      );
      res.send({ message: "Post actualizado con éxito", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el post" });
    }
  },
  async getByName(req, res) {
    try {
      if (req.params.search.length > 20) {
        return res.status(400).send("Busqueda demasiado larga");
      }
      const search = new RegExp(req.params.search, "i");
      const post = await Post.find({ body: search });
      console.log(post);
      if (post.length === 0) {
        res.status(200).send({
          message: "No hemos encontrado ningún resultado",
        });
      } else {
        res.send(post);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `Ha habido un problema al buscar el post ` });
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { $nin: req.user._id }
        },
        { $push: { likes: req.user._id } },
        { new: true }
      );

      if (post){
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likedPosts: req.params._id } },
        { new: true }
      );
      res.send({ message: "Like añadido al post con éxito", post });
    } else{
      res.send({ message: "Ya le habías dado like antes"});
    }


    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `Ha habido un problema al dar like al post ` });
    }
  },
  async unlike(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { _id: req.user._id }
        },
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      if (post){
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likedPosts: req.params._id } },
        { new: true }
      );
      res.send({ message: "Like retirado del post con éxito", post });
    } else{
      res.send({ message: "Ya habías quitado el like antes", post });
    }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `Ha habido un problema al quitar like al post ` });
    }
  },
};
module.exports = PostController;
