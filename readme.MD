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

````
git clone https://github.com/franpd8/red-social-backend
````
 
Seguidamente tendrás que descargar los módulos externos con node (Express,Mongoose,Bcrypt, Nodemailer,Jsonwebtoken,Multer,Dotenv). Para ello, realiza el siguiente comando.

```
npm i
```
Finalmente levanta el servidor con el siguiente comando para arrancar node.

````
npm start
````

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

