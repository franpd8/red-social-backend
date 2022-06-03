const User = require("../models/User");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken");
// const { jwt_secret } = require("../config/keys.js");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET 

const UserController = {
  async register(req, res,next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: password,
        confirmed: false,
        role: "user",
      });

      // await transporter.sendMail({
      //     to: req.body.email,
      //     subject: "Confirme su registro",
      //     html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
      //     <a href="#"> Click para confirmar tu registro</a>
      //     `,
      //   });

      res
        .status(201)
        .send({
          message: "Te hemos enviado un correo para confirmar el registro",
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
      error.origin = 'Usuario'
      next(error)

    }
  },
  // Pendiente
  async confirm(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params._id,
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
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).send({
          message: "Usuario no encontrado: Usuario o contraseña incorrectos",
        });
      }
      // 2 - confirmar contraseña
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).send({
          message: "Error de datos: Usuario o contraseña incorrectos",
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
      res.send({
        token,
        message: "¡Cuánto tiempo sin verte " + user.name,
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: `Ha habido un problema al conectarse`});
    }
  },
  async logout(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito " + user.name });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user._id }).populate("postIds");
      //  otra forma es .findById(req.user._id)


      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message:
            "Ha habido un problema al cargar la información del usuarios",
        });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar los usuarios" });
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: `Ha habido un problema al buscar el usuario con id = ${req.params._id}`,
        });
    }
  },
  async getByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Busqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i");
      const user = await User.find({ name: name });
      res.send(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `Ha habido un problema al buscar el usuario` });
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send({ user, message: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el usuario" });
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "usuario actualizado con éxito", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el usuario" });
    }
  },
};
module.exports = UserController;
