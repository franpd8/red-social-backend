#  Red Social 

## Índice

* Sobre el proyecto
    * Instalación y despliegue
    * Tecnologías usadas
    * Origen
    * Objetivos
    * Concepto e inspiración

* Retos presentados

* Agradecimientos

* Autores

## Sobre el proyecto

### 💫 Instalación y despliegue

Para descargarte el repositorio, en Visual Studio, abre una terminal y ejecuta el comando siguiente:

```
git clone https://github.com/franpd8/red-social-backend
```
 
Seguidamente tendrás que descargar los módulos externos con node (Express,Mongoose,Bcrypt, Nodemailer,Jsonwebtoken,Multer,Dotenv). Para ello, realiza el siguiente comando.

```
npm i
```

Después, configuramos nuestro archivo de variables de entorno .env.example para que quede como .env.js con los valores de nuestra base de datos en Mongo Atlas y las credenciales de nuestra dirección de email desde la cual vamos a enviar correos de confirmación para validar al usuario registrado. 

Dado que vamos a controlar la identidad de cada usuario mientras esté conectado en nuestra red social, utilizaremos jsonwebtoken para generar el token del usuario. 
```
PORT =  // Aquí iría la direccion del puerto a levantar

MONGO_URI = "" // Introducimos direccion de base de datos MongoDB

JWT_SECRET = "" // Introducimos secreto

USER_NODEMAILER = "" // Dirección de email
PASS_NODEMAILER  = "" // Contraseña email


```

Finalmente levanta el servidor con el siguiente comando para arrancar node.

````
npm start
````
Por otro lado, puedes probar el proyecto desplegado en Heroku a través del siguiente enlace:

```
enlace de heroku
```

### 💻 Tecnologías usadas

* JavaScript
* Node
* Express
* Bcrypt
* jsonwebtoken
* multer
* nodemailer
* dotenv
* Heroku
* MongoDB / Moongoose
* Postman

### Origen

Este proyecto está pensado como un ejercicio en The Bridge que nos permita poner en práctica los nuevos conocimientos adquiridos sobre Backend, concretamente utilizando Node+Express y Mongoose. Vienen de la mano, el saber gestionar bases de datos NoSQL y diversos módulos externos que nos han ayudado a desarrollar el proyecto. 

### ⚔️ Objetivos

Crear una API REST que sea capaz de lo siguiente:
* Registro de usuarios usando Bcrypt.
* Login de usuarios + token + middleware.
* Que sea capaz de crear un CRUD.
* Dar/quitar Like a post.
* Backend disponible en producción (Heroku).


### ⚔️ Funciones

En esta red social, tenemos tres elementos principales: <u>usuarios, publicaciones(<i>post</i>), y comentarios(<i>comment</i>)</u>. Sobre los cuales podremos realizar un CRUD.

Un usuario podrá <u>crear publicaciones</u> y podrá <u>comentar en ellas</u>. A su vez, también podrá dar like a dichas publicaciones e incluso a los comentarios de otros usuarios en las mismas. Estas acciones <u>se pueden revertir</u>,es decir, un usuario puede retirar sus likes de publicaciones y de comentarios.

Los usuarios se pueden seguir entre sí, existiendo por tanto la lista de seguidores y la lista de seguidos. 

Las publicaciones pueden o no, incluir una imagen si así lo desea el usuario. 

### ⚔️ Validaciones

A la hora de crear elementos: usuario, publicación o comentario; implementamos validaciones para <u>no permitir ningún campo vacío</u>. Por tanto, al crear el usuario no podrá dejar vacío los campos de nombre, email o contraseña. Para las publicaciones, será obligatorio tener un título mientras que la descripción será opcional. Los comentarios no pueden estar vacíos. 

Un usuario solo podrá editar las publicaciones y comentarios que <u>él mismo haya creado,</u> no pudiendo interferir en el contenido creado por los demás, salvo que su rango sea de administrador. El admin tiene total poder para modificar las publicaciones y comentarios de los demás usuarios.

Implementamos además dos requisitos para la <u>lista de seguidores y seguidos</u>: un usuario no puede seguirse a sí mismo, y sólo puede seguir a personas que no seguía con anterioridad. 


### CRUD: Usuarios, Publicaciones y Comentarios. 

Puedes revisar los endpoints disponibles para Postman en [este enlace ↗ ](https://documenter.getpostman.com/view/21015186/Uz5JGv5p)


## 🔜 Futuras Implementaciones

* Añadir estilos al correo de confirmación de usuarios. 
* Borrar información del usuario al eliminarlo: post,comentarios e imágenes.
* Borrar imágenes antiguas una vez son actualizadas. 
* Permitir subir varias imágenes a cada post.


##  ♥️ Agradecimientos

A todos los compis([Mike](https://github.com/MrSetOne),[Xavi](https://github.com/xavi-mat),[Germán](https://github.com/Molerog),[Vicent](https://github.com/Vincecoorp21) y profes en general: ([Sofía](https://github.com/SofiaPinilla), [Geer](https://github.com/GeerDev) e [Iván](https://github.com/ivanpuebla10)]).


## Autor

### [Fran](https://github.com/franpd8) 🐱

