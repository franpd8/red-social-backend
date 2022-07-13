const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const PORT = process.env.PORT;
// const confirmEmailHTML = require("../templates/confirmEmailHTML");
// const fs = require("fs");
const UserController = {
  async register(req, res, next) {
    try {
      let password;
      if (req.body.password !== undefined) {
        password = await bcrypt.hash(req.body.password, 10);
      }

      const user = await User.create({
        ...req.body,
        password: password,
        confirmed: false,
        role: "user",
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = `http://localhost:${PORT}/users/confirm/${emailToken}`;

      //   const confirmEmailContent = confirmEmailHTML(
      //     req.body.username,
      //     req.body.email,
      //     emailToken
      // );
      // await transporter.sendMail({
      //   to: req.body.email,
      //   subject: "Confirme su registro",
      //   html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
      //     <a href="${url}"> Click para confirmar tu registro</a>
      //     `,
      // });
      // fs.writeFileSync('public/fakeEmail.html', confirmEmailContent);

      res.status(201).send({
        // message: "Te hemos enviado un correo para confirmar el registro",
        message: "Thank you for register!",
        user,
      });
    } catch (error) {
      console.error(error);
      // res
      //   .status(500)
      //   .send([
      //     { message: "Ha habido un problema al crear el usuario" },
      //     error.message,
      //   ]);
      error.origin = "Usuario";
      next(error);
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      const user = await User.findByIdAndUpdate(
        req.payload.email,
        { confirmed: true },
        { new: true }
      );
      res.status(201).send({ message: "Usuario confirmado con exito" }, user);
    } catch (error) {
      console.error(error);
    }
  },
  async login(req, res) {
    try {
      // 1 - Buscar usuario
      const user = await User.findOne({ email: req.body.email })
        .populate({
          path: "postIds",
          populate: {
            path: "comments",
            populate: {
              path: "userId",
            },
          },
        })
        .populate({
          path: "followers",
        })
        .populate({
          path: "following",
        })
        .populate({
          path: "likedPosts",
          populate: {
            path: "userId",
          },
        })
        .populate({
          path: "commentIds",
          populate: {
            path: "postId",
            select: { title: 1, userId: 1 },
            populate: {
              path: "userId",
              select: { name: 1 },
            },
          },
        });
      if (!user) {
        return res.status(400).send({
          message: "User not found: Username or password not found",
        });
      }
      // 2 - confirmar contraseña
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        returnres.status(400).send({
          message: "Wrong credentials",
        });
      }
      //  3- opcional confirmar email
      // if(!user.confirmed){
      //     return res.status(400).send({message:"Debes confirmar tu correo"})
      // }

      //  4- crear token

      //  creacion del token con la info de la id del usuario y el secreto
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      // determina un limite de 4 tokens/sesiones, manteniendo siempre la más reciente con .shift
      if (user.tokens.length > 4) user.tokens.shift();
      // guarda en el usuario el array de tokens
      user.tokens.push(token);
      // guarda en la bd
      await user.save();
      // 5 - bienvenida
      return res.send({
        token,
        message: "Welcome" + user.name + " !",
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: `There was an erorr login in` });
    }
  },
  async logout(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      return res.send({ message: "Logout succesfully " + user.name });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "There was an error trying to logout",
      });
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user._id })
        .populate({
          path: "postIds",
        })
        .populate({
          path: "followers",
        })
        .populate({
          path: "following",
        })
        .populate({
          path: "likedPosts",
          populate: {
            path: "userId",
          },
        })
        .populate({
          path: "commentIds",
          select: {
            body: 1,
            postId: 1,
          },
          populate: {
            path: "postId",
            select: { title: 1, userId: 1 },
            populate: {
              path: "userId",
              select: { name: 1 },
            },
          },
        });
      //  otra forma es .findById(req.user._id)
      return res.send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "There was an error loading user data",
      });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: "postIds",
          populate: {
            path: "comments",
            populate: {
              path: "userId",
            },
          },
        })
        .populate({
          path: "followers",
        })
        .populate({
          path: "following",
        })
        .populate({
          path: "likedPosts",
          populate: {
            path: "userId",
          },
        })
        .populate({
          path: "commentIds",
          populate: {
            path: "postId",
            select: { title: 1, userId: 1 },
            populate: {
              path: "userId",
              select: { name: 1 },
            },
          },
        });
      if (users.length === 0) {
        res.send({ message: "There aren't users yet" });
      }
      return res.send(users);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "There was an error loading users" });
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
        .populate({
          path: "postIds",
          populate: {
            path: "comments",
            populate: {
              path: "userId",
            },
          },
        })
        .populate({
          path: "followers",
        })
        .populate({
          path: "following",
        })
        .populate({
          path: "likedPosts",
          populate: {
            path: "userId",
          },
        })
        .populate({
          path: "commentIds",
          populate: {
            path: "postId",
            select: { title: 1, userId: 1 },
            populate: {
              path: "userId",
              select: { name: 1 },
            },
          },
        });
      return res.send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: `There was an error while looking for user with id: ${req.params._id}`,
      });
    }
  },
  async getByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Search too long ");
      }
      const name = new RegExp(req.params.name, "i");
      const user = await User.find({ name: name });
      return res.send(user);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: `There was an error looking for the user` });
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      await Post.deleteMany({ userId: req.params._id });
      await Comment.deleteMany({ userId: req.params._id });

      return res.send({
        user,
        message: "User deleted: bye bye " + user.name,
      });

      // const posts = await Post.findById({userId:req.params._id});
      // console.log(posts)
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "There was an error deleting the user" });
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        {
          new: true,
        }
      );
      return res.send({ message: "User updated succesfully", user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "There was an error updating the user" });
    }
  },
  async follow(req, res) {
    if (req.params._id != req.user._id) {
      try {
        const followingUser = await User.findById(req.params._id);
        if (!followingUser.followers.includes(req.user._id)) {
          let userFollowed = await User.findByIdAndUpdate(
            req.params._id,
            { $push: { followers: req.user._id } },
            { new: true }
          ).populate({
              path: "followers",
            })
            .populate({
              path: "following",
            })
            .populate({
              path: "likedPosts",
              populate: {
                path: "userId",
              },
            })
            .populate({
              path: "commentIds",
              populate: {
                path: "postId",
                select: { title: 1, userId: 1 },
                populate: {
                  path: "userId",
                  select: { name: 1 },
                },
              },
            });

          const userLogged = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.params._id } },
            { new: true }
          );
          res
            .status(201)
            .send({
              message: "You are now following: " + userFollowed.name,
              userFollowed,
              userLogged,
            });
        } else {
          res
            .status(400)
            .send({ message: "You are already following this user" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "Some error happened while following this user" });
      }
    } else {
      res
        .status(400)
        .send({ message: "This is you, you can't follow youself!" });
    }
  },
  async unfollow(req, res) {
    try {
      const unfollowingUser = await User.findById(req.params._id);
      if (unfollowingUser.followers.includes(req.user._id)) {
        let userUnfollowed = await User.findByIdAndUpdate(
          req.params._id,
          { $pull: { followers: req.user._id } },
          { new: true }
        ).populate({
            path: "followers",
          })
          .populate({
            path: "following",
          })
          .populate({
            path: "likedPosts",
            populate: {
              path: "userId",
            },
          })
          .populate({
            path: "commentIds",
            populate: {
              path: "postId",
              select: { title: 1, userId: 1 },
              populate: {
                path: "userId",
                select: { name: 1 },
              },
            },
          });
        let userLogged = await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { following: req.params._id } },
          { new: true }
        );
        res
          .status(201)
          .send({
            message: "You are no longer following: " + userUnfollowed.name,
            userUnfollowed,
            userLogged,
          });
      } else {
        res
          .status(400)
          .send({
            message: "You never follow " + unfollowingUser.name + " before",
            unfollowingUser,
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `There was an error trying to unfollow this user`,
      });
    }
  },
};
module.exports = UserController;
