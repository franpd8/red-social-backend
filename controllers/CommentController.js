const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        postId: req.body.postId,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { commentIds: comment._id },
      });
      await Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment._id },
      });
      res
        .status(201)
        .send({ message: "Comentario añadido con éxito", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send([{ message: "Ha habido un problema al crear el comentario" }]);
    }
  },
  async getAll(req, res) {
    try {
      const comments = await Comment.find();
      if (comments.length === 0) {
        res.send({ message: "Todavía no hay comentarios" });
      }
      res.send(comments);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar los comentarios" });
    }
  },
  async getAllByPost(req, res) {
    try {
      const comments = await Post.findById(
        //   busca por parametro y muestra solo title y body
        req.params._id,
        { title: 1, body: 1 }
      )
        //   añade info del dueño del post
        .populate({
          path: "userId",
          // pero muestra solo nombre
          select: { name: 1 },
        })
        // añade info de los comentarios del post
        .populate({
          path: "comments",
          //   pero solo valor
          select: { body: 1 },
          //   añade info del dueño del comentario
          populate: {
            path: "userId",
            //   pero solo nombre
            select: { name: 1 },
          },
        });

      res.send(comments);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar los comentarios" });
    }
  },
  async getAllByUser(req, res) {
    try {
      const comments = await User.findById(req.params._id)
        //   añade comentarios del usuario
        .populate({
          path: "commentIds",
          select: { body: 1, postId: 1 },
          populate: {
            path: "postId",
            select: { title: 1, userId: 1 },
            populate: {
              path: "userId",
              select: { name: 1 },
            },
          },
        });

      res.send(comments);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar los comentarios" });
    }
  },
  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      // await User.findByIdAndUpdate(req.user._id, {
      //   $pull: { commentIds: comment._id },
      // });
      // await Post.findByIdAndUpdate(req.params._id, {
      //   $pull: { comments: comment._id },
      // });
      res
        .status(201)
        .send({ message: "Comentario eliminiado con éxito", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el post" });
    }
  },
  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );

      await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });

      await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });

      res.send({ message: "Comentario actualizado con éxito", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el comentario" });
    }
  },
  async like(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { $nin: req.user._id },
        },
        { $push: { likes: req.user._id } },
        { new: true }
      );
      if (comment) {
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { likedComments: req.params._id } },
          { new: true }
        );
        res.send({ message: "Like añadido al comentario con éxito", comment });
      } else {
        res.send({ message: "Ya le habías dado like antes" });
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
      const comment = await Comment.findOneAndUpdate(
        {
          _id: req.params._id,
          likes: { _id: req.user._id },
        },
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      if (comment) {
        await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { likedComments: req.params._id } },
          { new: true }
        );
        res.send({
          message: "Like retirado del comentario con éxito",
          comment,
        });
      } else {
        res.send({ message: "Ya habías quitado el like antes" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `Ha habido un problema al quitar like al post ` });
    }
  },
};
module.exports = CommentController;
