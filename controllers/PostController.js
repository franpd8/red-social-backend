const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async create(req, res, next) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
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
      const posts = await Post.find({}, { title: 1, body: 1, comments: 1 })
        .populate({ path: "userId", select: { name: 1, email: 1 } })
        .populate({
          path: "comments",
          select:{body:1},
          populate: {path:"userId",select: { name: 1 }}  
        });

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
      res
        .status(500)
        .send({
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
      res
        .status(500)
        .send({
          message: "Ha habido un problema al cargar los post del usuario",
        });
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ post, message: "Post eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el post" });
    }
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
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
};
module.exports = PostController;
